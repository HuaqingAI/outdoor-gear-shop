# HTH-108 P0 商品后台字段与素材交接表

Created: 2026-05-04 00:39 CST
Owner: Shopify 后台运营
Source issue: HTH-108
Parent issue: HTH-98

## 1. 用途

本表只服务于后台执行交接，不做选品策略扩展。目标是把 `HTH-98` 已确认的 P0 商品池转换成可供 CTO / 开发 / 后台导入使用的字段草案，并把 Shopify 实操前缺失的权限、素材、GA4、主题配置项一次性列清。

本表不代表已完成 Shopify 后台实际配置，也不代表允许开放购买。

## 2. 执行硬边界

所有 P0 商品在后台必须统一遵守以下规则：

- `admin_product_status=draft`
- `product_info.sample_verified=false`
- `product_info.preview_only=true`
- `product_info.notify_only=true`
- `backend_state` 只允许三档：`public_preview`、`coming_soon`、`hold_internal`
- 不开放购买，不开启 checkout，不激活发货承诺，不填写交期
- 价格字段只保留内部参考带宽，不作为 live price 发布
- 未取得 supplier 图片书面授权前，不得公开复用 supplier 图

### 2.1 后台状态口径

| 字段 | 含义 | 客户可见要求 |
| --- | --- | --- |
| `public_preview` | 允许进入 preview 目录 | 仍保持 notify-only，不可购买 |
| `coming_soon` | 可见但信息未补齐 | 仍保持 notify-only，不可购买 |
| `hold_internal` | 只保留后台草稿 | 不进导航，不进首页，不进核心集合 |

### 2.2 命名与槽位口径

- 延续现有 24 SKU 的 `OG-TS / OG-PB / OG-SS / OG-CK / OG-AL / OG-LS` 槽位命名，能复用的直接复用。
- `OG-TS-04` 与 `OG-LS-03` 合并后仍沿用 `OG-TS-04` 槽位，标题改为地钉 + 反光风绳套装。
- `OG-CF-01`、`OG-CF-02` 为本轮新增 draft 槽位，用于折叠桌 / 折叠椅。
- `OG-TR-01` 为 source-backed 小号工具收纳包草案槽位；当前 24 SKU seed 内无同名槽位，需新增 draft。
- 新增槽位如需 Shopify collection / category，新建时只做 draft 关联，不开放购买。

## 3. P0 12 款后台字段草案

字段说明：

- `price_band_usd` 仅作内部备注，勿在 storefront/Shopify live price 中启用。
- `key_specs` 只写中性事实，不写 waterproof、load-bearing、food-safe、medical 等结果型 claim。
- `metadata_minimum` 默认都包含：`sample_verified=false`、`preview_only=true`、`notify_only=true`。

| Draft slot | Source ref | Draft title | Handle | Category | Collection | `backend_state` | `price_band_usd` | Short summary | Key specs | Asset source note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OG-PB-02` | 现有 `OG-PB-02` | Roll-Top Dry Daypack | `roll-top-dry-daypack` | Packs & Bags | `packs-bags-preview` | `public_preview` | `49-74` | Roll-top daypack for day hikes, wet-weather carry, and camp-side organization. | `Capacity 20-25L`; `Roll-top closure`; `Coated shell`; `No waterproof guarantee` | 仅用自有图 / Codex 占位图；supplier 图待授权 |
| `OG-LS-02` | 现有 `OG-LS-02` | Ambient Camp Lantern | `ambient-camp-lantern` | Lighting & Safety | `lighting-safety-preview` | `coming_soon` | `29-44` | Rechargeable camp lantern for table light, vestibule use, and evening organization. | `Rechargeable`; `Type-C pending verification`; `Battery docs pending`; `No runtime claim` | 电池文件缺失前只保留 coming soon |
| `OG-CF-01` | 新增 | Aluminum Folding Camp Table | `aluminum-folding-camp-table` | Camp Furniture | `camp-furniture-preview` | `coming_soon` | `39-79` | Folding camp table draft for car camping, picnic prep, and camp kitchen staging. | `Aluminum frame`; `Carry bag pending`; `Open/fold size pending`; `No load claim` | 需新建 category/collection；仅占位图 |
| `OG-CF-02` | 新增 | Lightweight Folding Camp Chair | `lightweight-folding-camp-chair` | Camp Furniture | `camp-furniture-preview` | `coming_soon` | `29-59` | Folding camp chair draft for campsite seating, fishing, and grass setups. | `Foldable frame`; `Storage bag pending`; `Weight pending`; `No load claim` | 需新建 category/collection；仅占位图 |
| `OG-CK-03` | 现有 `OG-CK-03`，兼容 `OG-CA-R1` | Hanging Camp Kitchen Organizer | `hanging-camp-kitchen-organizer` | Camp Kitchen | `camp-kitchen-preview` | `public_preview` | `39-49` | Hanging organizer for camp kitchen separation, tableware storage, and soft-goods packing. | `Pocket zones`; `Fold-over closure`; `Hanging webbing`; `No food-safe claim` | 已有 source-backed 候选；supplier 图仍待授权 |
| `OG-TR-01` | 新增 `OG-TR-R1` source-backed 候选 | Small Utility Pouch | `small-utility-pouch` | Trail Repair & Utility Pouches | `trail-utility-preview` | `public_preview` | `18-26` | Compact utility pouch for cords, patches, tools, and small camp accessories. | `Single controlled display size`; `Zip closure`; `Material pending final lock`; `No tactical/emergency claim` | 需新建 category/collection；supplier 图待授权 |
| `OG-PB-03` | 现有 `OG-PB-03` | Packing Cube Trio | `packing-cube-trio` | Packs & Bags | `packs-bags-preview` | `public_preview` | `24-38` | Three-piece organizer set for clothing, sleep layers, and small-item separation. | `3-piece set`; `Mesh/ripstop`; `Three sizes`; `No compression guarantee` | 先用自有图 / Codex 占位图 |
| `OG-TS-04` | 合并 `OG-TS-04` + `OG-LS-03` | Aluminum Stake & Reflective Guyline Kit | `aluminum-stake-reflective-guyline-kit` | Tents & Shelter | `tents-shelter-preview` | `public_preview` | `16-24` | Shelter accessory kit for stakes, reflective guylines, and camp setup backups. | `8-10 stakes pending`; `Reflective guyline`; `Storage pouch`; `No safety guarantee` | 合并后重做主图，不再单独保留 `OG-LS-03` |
| `OG-TS-03` | 现有 `OG-TS-03` | Compact Groundsheet Footprint | `compact-groundsheet-footprint` | Tents & Shelter | `tents-shelter-preview` | `public_preview` | `29-42` | Lightweight groundsheet for tent floors, clean staging, and picnic use. | `1-2 size options pending`; `Folded size pending`; `Coated fabric`; `No waterproof guarantee` | 先替换泛图为 owned-neutral 占位图 |
| `OG-SS-02` | 现有 `OG-SS-02` | Inflatable Camp Sleeping Pad | `inflatable-camp-sleeping-pad` | Sleep Systems | `sleep-systems-preview` | `public_preview` | `49-88` | Inflatable sleep pad for car camping and entry trail sleep systems. | `Inflatable`; `Valve detail`; `Packed size pending`; `48h leak test pending` | 可 public preview，但 `sample_verified` 必须维持 false |
| `OG-SS-03` | 现有 `OG-SS-03` | Compressible Camp Pillow | `compressible-camp-pillow` | Sleep Systems | `sleep-systems-preview` | `public_preview` | `19-29` | Compact camp pillow for tent sleep, travel rest, and sleep bundle pairing. | `Compressible`; `Face fabric pending`; `Packed volume pending`; `No ergonomic claim` | 先用自有图 / Codex 占位图 |
| `OG-CK-01` | 现有 `OG-CK-01` | Nesting Camp Cook Pot Set | `nesting-camp-cook-pot-set` | Camp Kitchen | `camp-kitchen-preview` | `coming_soon` | `49-68` | Nested cook pot draft for two-person camp meals and simple hot-water use. | `2-pot nested set`; `Capacity pending final lock`; `Material pending`; `No food-safe claim` | 食品接触 / 材质文件未齐前仅保留 coming soon |

### 3.1 统一 metadata 草案

所有 P0 draft 商品统一使用以下最小 metadata 结构：

```json
{
  "product_info": {
    "sample_verified": false,
    "preview_only": true,
    "notify_only": true,
    "backend_state": "public_preview | coming_soon | hold_internal",
    "price_band_usd": "internal note only",
    "asset_source": "owned_placeholder | codex_image2_pending | supplier_auth_pending",
    "claim_guardrail": "no waterproof/load-bearing/food-safe/medical claim"
  }
}
```

## 4. 现有 24 SKU 处理对照

本节只定义后台执行动作，不改策略口径。

| Slot | 当前标题 | 后台执行动作 | 导航/集合动作 |
| --- | --- | --- | --- |
| `OG-TS-01` | RidgeLine Two-Person Dome Tent | 保留 draft；状态改 `coming_soon` | 移出首页主推，可留二级集合 |
| `OG-TS-02` | Meadow Tarp Shelter Kit | 保留 draft；状态改 `coming_soon` | 移出首页主推，可留二级集合 |
| `OG-TS-03` | Compact Groundsheet Footprint | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-TS-04` | Aluminum Stake & Guyline Kit | 更新标题并合并 `OG-LS-03` 内容 | 保留在核心 preview 集合 |
| `OG-PB-01` | Summit 45L Trail Pack | 保留 draft；状态改 `hold_internal` | 从核心集合弱化 |
| `OG-PB-02` | Roll-Top Dry Daypack | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-PB-03` | Packing Cube Trio | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-PB-04` | Trek Waist Pack | 保留 draft；状态改 `coming_soon` | 不进首页主推 |
| `OG-SS-01` | Three-Season Mummy Sleeping Bag | 保留 draft；状态改 `coming_soon` | 不进首页主推 |
| `OG-SS-02` | Inflatable Camp Sleeping Pad | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-SS-03` | Camp Pillow Compressible | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-SS-04` | Thermal Bag Liner | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-CK-01` | Nesting Camp Cook Pot Set | 更新为 P0 字段；仅 `coming_soon` | 不进首页主推，保留集合位 |
| `OG-CK-02` | Folding Camp Tableware Kit | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-CK-03` | Hanging Camp Kitchen Organizer | 更新为 P0 字段 | 保留在核心 preview 集合 |
| `OG-CK-04` | Insulated Camp Mug Pair | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-AL-01` | Lightweight Rain Shell | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-AL-02` | Grid Fleece Quarter Zip | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-AL-03` | Merino Hiking Sock Set | 保留 draft；状态改 `coming_soon` | 不进首页主推 |
| `OG-AL-04` | Sun Trek Cap | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-LS-01` | Rechargeable Trail Headlamp | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |
| `OG-LS-02` | Ambient Camp Lantern | 更新为 P0 字段；仅 `coming_soon` | 可保留集合位，不上首页主推直至文件补齐 |
| `OG-LS-03` | Reflective Guyline Marker Set | 合并入 `OG-TS-04` 后单独保留 `hold_internal` 或停用 | 从导航/集合移除 |
| `OG-LS-04` | Trail First-Aid Organizer Pouch | 保留 draft；状态改 `hold_internal` | 从核心集合移除 |

## 5. P0 素材缺口表

| Draft slot | 主图要求 | 场景图要求 | 细节图要求 | 规格图要求 | 当前可用素材口径 | 阻塞 |
| --- | --- | --- | --- | --- | --- | --- |
| `OG-PB-02` | 正/背/开口 | 雨天通勤、湖边携带 | 卷口扣具、肩带 | 容量/尺寸/重量 | 仅占位图 | supplier 图授权未闭环 |
| `OG-LS-02` | 亮灯主图、挂放主图 | 桌面、帐篷前庭 | Type-C、按键、挂钩 | 电池容量、模式、尺寸 | 仅占位图 | 缺 MSDS / UN38.3 / runtime 文件 |
| `OG-CF-01` | 展开/折叠/收纳袋 | 车露营桌面 | 桌面纹理、支架 | 展开/收纳尺寸、重量 | 无现成可用图 | 缺 approved Hero/PDP 素材 |
| `OG-CF-02` | 正侧背、收纳袋 | 营地休息、草地 | 连接件、脚垫 | 展开/收纳尺寸、重量 | 无现成可用图 | 缺 approved Hero/PDP 素材 |
| `OG-CK-03` | 展开/折叠/空载 | 桌边、车尾、厨房挂放 | 口袋、挂扣、分隔 | 尺寸、口袋数 | 有 source-backed 候选，但不能直用 supplier 图 | 缺书面授权 |
| `OG-TR-01` | 正面、内部、拉链 | 车尾箱、背包内分组 | 拉链、织带、内袋 | 尺寸、容量示意 | 有 source-backed 候选，但不能直用 supplier 图 | 缺书面授权与最终展示规格 |
| `OG-PB-03` | 三件套平铺 | 行李/背包内分组 | 网布、拉链、提手 | 三个尺寸 | 仅占位图 | 缺自有图 |
| `OG-TS-04` | 全套平铺、收纳袋 | 帐篷/天幕边线 | 地钉头、绳扣、反光线 | 数量、长度、重量 | 仅占位图 | 合并后需重做整套图册 |
| `OG-TS-03` | 展开/折叠/收纳袋 | 帐篷底、野餐地 | 边角、扣眼、涂层 | 展开/收纳尺寸 | 仅占位图 | 缺自有图 |
| `OG-SS-02` | 展开、收纳、阀门 | 帐篷内睡眠 | 阀门、面料、厚度 | 长宽厚、收纳体积 | 仅占位图 | 缺样品漏气测试图 |
| `OG-SS-03` | 展开、压缩、收纳 | 睡垫搭配 | 面料、填充/气阀 | 尺寸、压缩体积 | 仅占位图 | 缺自有图 |
| `OG-CK-01` | 全套展开、嵌套 | 营地桌面 | 折叠把手、盖子、刻度 | 容量、重量、材质 | 仅占位图 | 缺材质/食品接触证明 |

## 6. Shopify 执行前的一页式待办

以下事项未提供前，不进入 Shopify 后台实操，不假设已具备：

| 待 board 提供 | 需要内容 | 用途 |
| --- | --- | --- |
| Shopify 后台权限 | Staff access 至 `Products`、`Content/Files`、`Online Store > Navigation`、`Online Store > Themes`、`Settings/Customer events` | 创建/更新 draft 商品、上传素材、建导航、挂 GA4 |
| Theme 编辑权限 | 可进入目标 theme 的 customize/editor | 关联新导航菜单、挂 Hero 主图、核对 preview-only 文案 |
| Hero 主图 | 1 张已审批 `16:9` 主图，建议最短边 >= 2000px | 首页 Hero 上传与替换 |
| GA4 Measurement ID | 正式 `G-XXXXXXXXXX` | 填写或核对 GA4 |
| 素材授权 | P0 每款商品的图源授权结论，或书面批准使用 Codex image2 占位图 | 避免非法复用 supplier 图 |
| MCP / 浏览器执行能力 | 若需截图回传，需提供可用 MCP/API/人工入口 | 回传后台截图、预览链接、时间戳 |
| 菜单挂载位确认 | 顶部主导航、Footer、或首页 section 的最终挂载位置 | 避免建了菜单但主题未关联 |

## 7. 实操回传模板

待 board 补齐上述条件并开始 Shopify 后台执行后，统一按以下口径回传：

- 商品 admin link
- 预览链接
- `product_info.sample_verified=false` 截图
- 导航菜单截图
- Theme editor 关联截图
- GA4 Measurement ID 截图
- 执行时间戳

## 8. 本轮结论

`HTH-108` 本轮已完成的交付仅包括：

- P0 12 款后台字段草案
- 现有 24 SKU 的保留 / 弱化 / hold 对照
- 素材缺口表
- Shopify 后台执行前的一页式阻塞待办

未完成且本轮不自行假设具备的内容：

- Shopify 后台实际建品 / 传图 / 建导航 / 挂主题 / 配 GA4
- Hero 主图上传
- GA4 Measurement ID 填写核对
- 后台截图与预览链接回传
