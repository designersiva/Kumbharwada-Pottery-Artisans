import React, { useState } from 'react';
import { WholesaleLead, Product, Artisan, LeadStatus } from '../types';
import {
  FileText,
  Users,
  Package,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Clock,
  Truck,
  Filter,
  Plus,
  ArrowLeft,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  leads: WholesaleLead[];
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => void;
  products: Product[];
  onToggleProductStock: (productId: string) => void;
  artisans: Artisan[];
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  leads,
  onUpdateLeadStatus,
  products,
  onToggleProductStock,
  artisans,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'artisans'>('leads');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLeadForQuote, setSelectedLeadForQuote] = useState<WholesaleLead | null>(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      lead.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.deliveryCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.businessName && lead.businessName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Calculate Pipeline Metrics
  const totalLeadsCount = leads.length;
  const pendingQuotationsCount = leads.filter((l) => l.status === 'New Lead').length;
  const activeInProductionCount = leads.filter((l) => l.status === 'Production In Progress').length;
  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.totalEstimatedAmount || 20000), 0);

  const handleSendWhatsAppUpdate = (lead: WholesaleLead) => {
    let msg = `*Update from Kumbharwada Pottery Artisans, Mumbai*\n`;
    msg += `Hello ${lead.buyerName},\n`;
    msg += `Regarding your wholesale inquiry for ${lead.category} (${lead.estimatedQuantity}):\n`;
    msg += `Current Status: *${lead.status}*\n`;
    msg += `Kiln Coordinator: +91 98201 44520\n`;
    msg += `Delivery Destination: ${lead.deliveryCity}\n`;
    msg += `Please reply here to confirm dispatch milestones.`;

    const encoded = encodeURIComponent(msg);
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone.length >= 10 ? cleanPhone : '919820144520'}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF3E7] text-[#2C221E] pb-20">
      {/* Top Admin Header */}
      <div className="bg-[#FFF9F0] border-b border-[#E5D3B5] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="p-2 rounded-lg border border-[#E5D3B5] hover:bg-[#E5D3B5]/40 text-[#5C4D44] hover:text-[#2C221E] transition-colors"
              title="Return to Public Marketplace"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C4722]">
                Internal Coordination Desk
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
                Kumbharwada Admin Portal
              </h1>
            </div>
          </div>

          {/* Module Switcher Tabs (Zero-Pill: segmented controls with functional buttons) */}
          <div className="flex items-center p-1 bg-[#E5D3B5]/40 rounded-lg border border-[#E5D3B5]">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-white text-[#A85D36] shadow-xs'
                  : 'text-[#5C4D44] hover:text-[#2C221E]'
              }`}
            >
              Enquiries & Quotations ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-[#A85D36] shadow-xs'
                  : 'text-[#5C4D44] hover:text-[#2C221E]'
              }`}
            >
              Product Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('artisans')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === 'artisans'
                  ? 'bg-white text-[#A85D36] shadow-xs'
                  : 'text-[#5C4D44] hover:text-[#2C221E]'
              }`}
            >
              Artisans ({artisans.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Metric Cards Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
            <div className="flex items-center justify-between text-xs text-[#6B5A51]">
              <span>Total Wholesale Inquiries</span>
              <FileText className="w-4 h-4 text-[#A85D36]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#2C221E] mt-2 tabular-nums">
              {totalLeadsCount}
            </div>
            <div className="text-[11px] text-[#4C563B] mt-1">Live inquiries stored</div>
          </div>

          <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
            <div className="flex items-center justify-between text-xs text-[#6B5A51]">
              <span>Pending Quotations</span>
              <Clock className="w-4 h-4 text-[#8C4722]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#8C4722] mt-2 tabular-nums">
              {pendingQuotationsCount}
            </div>
            <div className="text-[11px] text-[#8C4722] mt-1">Requires artisan response</div>
          </div>

          <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
            <div className="flex items-center justify-between text-xs text-[#6B5A51]">
              <span>Active in Kiln Production</span>
              <Package className="w-4 h-4 text-[#4C563B]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#4C563B] mt-2 tabular-nums">
              {activeInProductionCount}
            </div>
            <div className="text-[11px] text-[#5C4D44] mt-1">Firing & packing</div>
          </div>

          <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
            <div className="flex items-center justify-between text-xs text-[#6B5A51]">
              <span>Pipeline Value</span>
              <TrendingUp className="w-4 h-4 text-[#A85D36]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#A85D36] mt-2 tabular-nums">
              ₹{totalPipelineValue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#5C4D44] mt-1">Estimated seasonal orders</div>
          </div>
        </div>

        {/* TAB 1: Leads & Quotations */}
        {activeTab === 'leads' && (
          <div className="bg-[#FFF9F0] rounded-xl border border-[#E5D3B5] overflow-hidden">
            {/* Table Control Filters */}
            <div className="p-4 sm:p-5 border-b border-[#E5D3B5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5A51]">Filter:</span>
                {['all', 'New Lead', 'Quotation Sent', 'Production In Progress', 'Dispatched', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#A85D36] text-white'
                        : 'bg-white border border-[#E5D3B5] text-[#5C4D44] hover:bg-[#FAF3E7]'
                    }`}
                  >
                    {st === 'all' ? 'All Leads' : st}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#6B5A51] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search buyer or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-white border border-[#E5D3B5] rounded-md text-xs w-full sm:w-64 focus:outline-none focus:border-[#A85D36]"
                />
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF3E7] text-[#6B5A51] border-b border-[#E5D3B5] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Lead ID & Date</th>
                    <th className="py-3 px-4">Buyer & Organization</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Items / Quantity</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5D3B5]">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF3E7]/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-[#6B5A51]">
                        <div className="font-semibold text-[#2C221E]">{lead.id}</div>
                        <div>{lead.createdAt}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#2C221E]">{lead.buyerName}</div>
                        <div className="text-[11px] text-[#5C4D44]">{lead.businessName || 'Direct Customer'}</div>
                        <div className="text-[11px] text-[#8C4722]">{lead.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-[#5C4D44]">{lead.buyerType}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#2C221E]">{lead.category}</div>
                        <div className="text-[11px] text-[#4C563B] font-medium">{lead.estimatedQuantity}</div>
                        {lead.totalEstimatedAmount && (
                          <div className="text-[11px] text-[#6B5A51] tabular-nums">
                            Est: ₹{lead.totalEstimatedAmount.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#5C4D44]">
                        <div>{lead.deliveryCity}</div>
                        {lead.pincode && <div className="text-[11px] text-[#6B5A51]">{lead.pincode}</div>}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="bg-white border border-[#E5D3B5] rounded p-1 text-[11px] font-medium text-[#2C221E] focus:outline-none"
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Production In Progress">Production In Progress</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleSendWhatsAppUpdate(lead)}
                          className="p-1.5 bg-[#4C563B] hover:bg-[#373E2B] text-white rounded text-[11px] inline-flex items-center gap-1 cursor-pointer"
                          title="Send update via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => setSelectedLeadForQuote(lead)}
                          className="p-1.5 bg-[#E5D3B5] hover:bg-[#D4BE9B] text-[#2C221E] rounded text-[11px] inline-flex items-center gap-1 cursor-pointer"
                          title="View lead notes"
                        >
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Products Manager */}
        {activeTab === 'products' && (
          <div className="bg-[#FFF9F0] rounded-xl border border-[#E5D3B5] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                  Product Catalogue Management
                </h3>
                <p className="text-xs text-[#5C4D44]">
                  Manage stock availability, minimum order quantities (MOQ), and wholesale tier pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#FAF3E7] p-4 rounded-xl border border-[#E5D3B5] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C4722] mb-1">
                      <span className="font-mono font-semibold">{prod.code}</span>
                      <span>MOQ: {prod.moq} pcs</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#2C221E] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#5C4D44] mt-1 line-clamp-2">
                      {prod.shortDesc}
                    </p>
                    <div className="mt-3 text-xs bg-white p-2.5 rounded-lg border border-[#E5D3B5] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#6B5A51]">Retail Rate:</span>
                        <span className="font-semibold tabular-nums">₹{prod.retailPrice}</span>
                      </div>
                      <div className="flex justify-between text-[#A85D36]">
                        <span>Bulk 1,000+ Tier:</span>
                        <span className="font-bold tabular-nums">
                          ₹{prod.priceTiers[prod.priceTiers.length - 1]?.pricePerUnit || prod.retailPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#E5D3B5] flex items-center justify-between">
                    <span className="text-xs text-[#5C4D44]">Stock Status:</span>
                    <button
                      onClick={() => onToggleProductStock(prod.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                        prod.readyStock
                          ? 'bg-[#4C563B] text-white hover:bg-[#373E2B]'
                          : 'bg-[#8C4722] text-white hover:bg-[#A85D36]'
                      }`}
                    >
                      {prod.readyStock ? 'Ready Stock Active' : 'Made to Order Only'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Artisans Management */}
        {activeTab === 'artisans' && (
          <div className="bg-[#FFF9F0] rounded-xl border border-[#E5D3B5] p-6 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C221E]">
                Artisan Capacity & Workshops
              </h3>
              <p className="text-xs text-[#5C4D44]">
                Coordinate batch allocations across Kumbharwada kilns based on monthly throughput.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artisans.map((art) => (
                <div key={art.id} className="bg-[#FAF3E7] p-5 rounded-xl border border-[#E5D3B5] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#2C221E]">{art.name}</h4>
                      <div className="text-xs text-[#8C4722]">{art.familyWorkshop}</div>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-1 rounded border border-[#E5D3B5] text-[#4C563B] font-semibold">
                      {art.generation}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C4D44]">{art.bio}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded border border-[#E5D3B5]">
                    <div>
                      <span className="text-[#6B5A51] block text-[11px]">Monthly Capacity</span>
                      <span className="font-semibold text-[#2C221E]">{art.capacityPerMonth}</span>
                    </div>
                    <div>
                      <span className="text-[#6B5A51] block text-[11px]">Contact Line</span>
                      <span className="font-semibold text-[#2C221E]">{art.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {selectedLeadForQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFF9F0] max-w-lg w-full rounded-2xl border border-[#E5D3B5] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#8C4722]">{selectedLeadForQuote.id}</span>
                <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                  {selectedLeadForQuote.buyerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForQuote(null)}
                className="text-sm font-semibold text-[#6B5A51] hover:text-[#2C221E]"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 bg-[#FAF3E7] p-4 rounded-xl border border-[#E5D3B5]">
              <div><strong>Buyer Type:</strong> {selectedLeadForQuote.buyerType}</div>
              <div><strong>Business:</strong> {selectedLeadForQuote.businessName || 'N/A'}</div>
              <div><strong>Phone:</strong> {selectedLeadForQuote.phone}</div>
              <div><strong>Email:</strong> {selectedLeadForQuote.email || 'N/A'}</div>
              <div><strong>Delivery Destination:</strong> {selectedLeadForQuote.deliveryCity} {selectedLeadForQuote.pincode}</div>
              <div><strong>Requirement:</strong> {selectedLeadForQuote.category} ({selectedLeadForQuote.estimatedQuantity})</div>
              {selectedLeadForQuote.additionalNotes && (
                <div className="pt-2 border-t border-[#E5D3B5]">
                  <strong>Special Instructions:</strong>
                  <p className="mt-1 italic text-[#5C4D44]">{selectedLeadForQuote.additionalNotes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  handleSendWhatsAppUpdate(selectedLeadForQuote);
                  setSelectedLeadForQuote(null);
                }}
                className="py-2 px-4 text-xs font-semibold text-white bg-[#4C563B] rounded-lg hover:bg-[#373E2B]"
              >
                Send WhatsApp Update
              </button>
              <button
                onClick={() => setSelectedLeadForQuote(null)}
                className="py-2 px-4 text-xs font-medium text-[#2C221E] bg-[#E5D3B5] rounded-lg hover:bg-[#D4BE9B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
