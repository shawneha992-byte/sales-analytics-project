import React, { useState } from "react";
import {
  BadgePercent,
  TrendingUp,
  Tag,
  DollarSign,
  ArrowUpRight,
  Filter,
  CalendarDays,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./DiscountAnalysis.css";

const discountPerformanceData = [
  { range: "0 - 10%", revenue: 145000, orders: 1200 },
  { range: "11 - 20%", revenue: 210000, orders: 1850 },
  { range: "21 - 30%", revenue: 98000, orders: 920 },
  { range: "31 - 40%", revenue: 45000, orders: 410 },
  { range: "50%+", revenue: 18000, orders: 230 },
];

const activeCampaigns = [
  {
    id: "#CAMP-501",
    name: "Summer Mega Sale",
    discountType: "Flat 25% Off",
    code: "SUMMER25",
    usageCount: 840,
    revenueGenerated: "$42,500",
    status: "Active",
  },
  {
    id: "#CAMP-502",
    name: "First-Time Buyer Deal",
    discountType: "$20 Off",
    code: "WELCOME20",
    usageCount: 620,
    revenueGenerated: "$31,000",
    status: "Active",
  },
  {
    id: "#CAMP-503",
    name: "Tech Clearance",
    discountType: "Flat 40% Off",
    code: "TECH40",
    usageCount: 310,
    revenueGenerated: "$28,400",
    status: "Paused",
  },
  {
    id: "#CAMP-504",
    name: "Weekend Flash Promo",
    discountType: "15% Off",
    code: "WEEKEND15",
    usageCount: 950,
    revenueGenerated: "$19,200",
    status: "Expired",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">{label} Discount</p>
      <p className="tooltip-value">
        Revenue: ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

function DiscountAnalysis() {
  const [campaigns] = useState(activeCampaigns);

  return (
    <div className="dashboard discount-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          
          <p>Evaluate promotional campaign effectiveness and revenue impact</p>
        </div>

        <div className="header-actions">
          <button className="date-filter">
            <CalendarDays size={17} />
            <span>Last 30 Days</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon purple">
              <BadgePercent size={21} />
            </div>
            <span className="stat-period">This Month</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Discounts Given</span>
            <h2>$32,450</h2>
            <div className="stat-growth positive">
              <ArrowUpRight size={15} />
              <span>4.2%</span>
              <small>vs last month</small>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              <Tag size={21} />
            </div>
            <span className="stat-period">Active Promos</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Coupon Redemptions</span>
            <h2>2,720</h2>
            <div className="stat-growth positive">
              <ArrowUpRight size={15} />
              <span>14.5%</span>
              <small>redemption rate</small>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon cyan">
              <DollarSign size={21} />
            </div>
            <span className="stat-period">Attributed</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Discount Revenue</span>
            <h2>$121,100</h2>
            <div className="stat-growth positive">
              <ArrowUpRight size={15} />
              <span>18.2%</span>
              <small>of total sales</small>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon orange">
              <TrendingUp size={21} />
            </div>
            <span className="stat-period">Average</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Avg. Order Discount</span>
            <h2>18.4%</h2>
            <div className="stat-growth positive">
              <ArrowUpRight size={15} />
              <span>Optimum</span>
              <small>margin protected</small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="dashboard-card discount-chart-card">
        <div className="card-header">
          <div>
            <h3>Revenue by Discount Bracket</h3>
            <p>Analyze which discount ranges drive the most sales volume</p>
          </div>
        </div>

        <div className="sales-chart" style={{ marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={discountPerformanceData}>
              <CartesianGrid stroke="#252b3b" vertical={false} />
              <XAxis
                dataKey="range"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7f879b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7f879b", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Campaigns Table Card */}
      <div className="dashboard-card discount-table-card" style={{ marginTop: "18px" }}>
        <div className="card-header">
          <div>
            <h3>Active Promotional Campaigns</h3>
            <p>Performance overview of individual coupon codes</p>
          </div>
        </div>

        <div className="product-table full-table">
          <div className="table-head discount-grid-layout">
            <span>Campaign Name</span>
            <span>Promo Code</span>
            <span>Discount Type</span>
            <span>Redemptions</span>
            <span>Revenue Generated</span>
            <span>Status</span>
          </div>

          {campaigns.map((camp) => (
            <div className="product-row discount-grid-layout" key={camp.id}>
              <div className="product-info">
                <div>
                  <strong>{camp.name}</strong>
                  <span className="product-id-tag">{camp.id}</span>
                </div>
              </div>

              <div>
                <span className="code-pill">{camp.code}</span>
              </div>

              <span className="units">{camp.discountType}</span>

              <span className="units">{camp.usageCount} orders</span>

              <strong className="revenue">{camp.revenueGenerated}</strong>

              <div>
                <span className={`status-badge ${camp.status.toLowerCase()}`}>
                  <span className="status-dot" />
                  {camp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscountAnalysis;