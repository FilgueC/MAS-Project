import { useState } from "react";

interface District {
  id: string;
  name: string;
  cx: number;
  cy: number;
  sales: number;
  orders: number;
  revenue: number;
}

const districts: District[] = [
  { id: "viana", name: "Viana do Castelo", cx: 82, cy: 22, sales: 38, orders: 38, revenue: 9800 },
  { id: "braga", name: "Braga", cx: 90, cy: 55, sales: 112, orders: 112, revenue: 28900 },
  { id: "porto", name: "Porto", cx: 72, cy: 88, sales: 284, orders: 284, revenue: 76200 },
  { id: "vilareal", name: "Vila Real", cx: 152, cy: 52, sales: 29, orders: 29, revenue: 7400 },
  { id: "braganca", name: "Bragança", cx: 224, cy: 28, sales: 18, orders: 18, revenue: 4600 },
  { id: "aveiro", name: "Aveiro", cx: 78, cy: 115, sales: 95, orders: 95, revenue: 24300 },
  { id: "viseu", name: "Viseu", cx: 138, cy: 118, sales: 44, orders: 44, revenue: 11200 },
  { id: "guarda", name: "Guarda", cx: 186, cy: 128, sales: 22, orders: 22, revenue: 5600 },
  { id: "coimbra", name: "Coimbra", cx: 88, cy: 152, sales: 87, orders: 87, revenue: 22100 },
  { id: "castelobranco", name: "Castelo Branco", cx: 168, cy: 172, sales: 31, orders: 31, revenue: 7900 },
  { id: "leiria", name: "Leiria", cx: 58, cy: 190, sales: 62, orders: 62, revenue: 15800 },
  { id: "santarem", name: "Santarém", cx: 102, cy: 228, sales: 58, orders: 58, revenue: 14700 },
  { id: "portalegre", name: "Portalegre", cx: 178, cy: 218, sales: 19, orders: 19, revenue: 4800 },
  { id: "lisboa", name: "Lisboa", cx: 38, cy: 258, sales: 431, orders: 431, revenue: 118400 },
  { id: "setubal", name: "Setúbal", cx: 62, cy: 295, sales: 98, orders: 98, revenue: 25200 },
  { id: "evora", name: "Évora", cx: 138, cy: 278, sales: 35, orders: 35, revenue: 8900 },
  { id: "beja", name: "Beja", cx: 130, cy: 328, sales: 24, orders: 24, revenue: 6100 },
  { id: "faro", name: "Faro", cx: 138, cy: 382, sales: 76, orders: 76, revenue: 19400 },
];

const maxSales = Math.max(...districts.map((d) => d.sales));
const totalSales = districts.reduce((a, d) => a + d.sales, 0);
const totalRevenue = districts.reduce((a, d) => a + d.revenue, 0);

function getSalesColor(sales: number): string {
  const intensity = sales / maxSales;
  if (intensity > 0.8) return "#065f46";
  if (intensity > 0.5) return "#059669";
  if (intensity > 0.3) return "#10b981";
  if (intensity > 0.15) return "#34d399";
  if (intensity > 0.05) return "#6ee7b7";
  return "#a7f3d0";
}

function getRadius(sales: number): number {
  const intensity = sales / maxSales;
  return 7 + intensity * 22;
}

interface PortugalMapProps {
  title?: string;
  subtitle?: string;
}

export function PortugalMap({
  title = "Densidade Geográfica de Vendas",
  subtitle = "Portugal Continental",
}: PortugalMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="mb-4">
        <h2 className="text-gray-900 text-base">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG Map */}
        <div className="relative flex-shrink-0 mx-auto">
          {/* Tooltip box */}
          {hoveredDistrict && (
            <div className="absolute top-0 left-0 z-10 bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 text-xs pointer-events-none min-w-[160px]">
              <p className="text-gray-900 mb-1">{hoveredDistrict.name}</p>
              <p className="text-gray-500">Encomendas: <span className="text-gray-800">{hoveredDistrict.orders}</span></p>
              <p className="text-gray-500">Receita: <span className="text-emerald-700">€{hoveredDistrict.revenue.toLocaleString("pt-PT")}</span></p>
              <p className="text-emerald-600">{((hoveredDistrict.sales / totalSales) * 100).toFixed(1)}% do total</p>
            </div>
          )}

          <svg
            viewBox="0 0 300 420"
            width="240"
            height="336"
            className="overflow-visible"
          >
            {/* Portugal mainland simplified outline */}
            <path
              d="
                M 60,5 L 252,5
                L 258,25 L 262,52 L 265,82 L 262,110
                L 266,140 L 262,170 L 266,200
                L 260,230 L 264,262 L 258,292
                L 252,318 L 245,342
                L 232,362 L 215,378 L 195,390
                L 160,397 L 125,397 L 90,394
                L 60,390 L 38,382
                L 18,362 L 6,342 L 14,318
                L 4,294 L 20,272 L 8,252
                L 4,228 L 16,204 L 6,182
                L 20,160 L 8,136 L 18,112
                L 6,88 L 18,64 L 14,38
                L 36,20 L 60,5
                Z
              "
              fill="#f0fdf4"
              stroke="#d1fae5"
              strokeWidth="1.5"
            />

            {/* District sales circles */}
            {districts.map((d) => (
              <g
                key={d.id}
                onMouseEnter={() => setHoveredDistrict(d)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={getRadius(d.sales) + 4}
                  fill="transparent"
                />
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={getRadius(d.sales)}
                  fill={getSalesColor(d.sales)}
                  fillOpacity={hoveredDistrict?.id === d.id ? 1 : 0.82}
                  stroke="white"
                  strokeWidth="1.5"
                  className="transition-all"
                />
                {d.sales > 80 && (
                  <text
                    x={d.cx}
                    y={d.cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    style={{ pointerEvents: "none" }}
                  >
                    {d.sales}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Legend + Stats */}
        <div className="flex-1 space-y-4 min-w-0">
          {/* Color legend */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Intensidade de Vendas</p>
            <div className="flex items-center gap-1.5">
              {["#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#065f46"].map((c, i) => (
                <div key={c} className="w-5 h-3 rounded" style={{ backgroundColor: c }} />
              ))}
              <div className="flex justify-between flex-1 text-xs text-gray-400 ml-1">
                <span>Baixo</span>
                <span>Alto</span>
              </div>
            </div>
          </div>

          {/* Top Districts */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Top Distritos</p>
            <div className="space-y-1.5">
              {[...districts]
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 6)
                .map((d, i) => (
                  <div
                    key={d.id}
                    className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
                      hoveredDistrict?.id === d.id ? "bg-emerald-50" : ""
                    }`}
                    onMouseEnter={() => setHoveredDistrict(d)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    <span className="text-xs text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-xs text-gray-700 truncate">{d.name}</span>
                        <span className="text-xs text-gray-600 ml-2 flex-shrink-0">{d.sales}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1">
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: `${(d.sales / maxSales) * 100}%`,
                            backgroundColor: getSalesColor(d.sales),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Total Stats */}
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
            <p className="text-xs text-emerald-700 mb-1">Total Nacional</p>
            <p className="text-lg text-emerald-900">
              {totalSales.toLocaleString("pt-PT")} encomendas
            </p>
            <p className="text-xs text-emerald-600">
              €{totalRevenue.toLocaleString("pt-PT")} em receita
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
