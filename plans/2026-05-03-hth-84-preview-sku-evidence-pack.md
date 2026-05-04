# HTH-84 Preview SKU 图片授权、样品与履约证据包

Created: 2026-05-03 21:10 Asia/Shanghai
Owner: 供应链协调
Source issue: HTH-84
Upstream evidence: HTH-71, HTH-59, HTH-53

## 1. 用途

本文件把当前 preview storefront 的 9 个 SKU 位，统一整理成一份面向 `HTH-84` 的供应链证据包，专门回答以下问题：

1. 哪些 SKU 位已有真实 source-backed 候选，哪些仍只是 placeholder/concept。
2. 当前 storefront 使用的图片是否只能算 preview placeholder，还是已经拿到商品页复用授权。
3. 样品、履约、售后边界还缺什么，谁负责补，补完前能走到哪一步。
4. 素材替换优先级应该先补主图、细节图、场景图，还是先维持纯文字/占位。

本文件不承诺价格、库存、交期、质保、认证、食品接触、承重、防水、防护或任何 live-selling 能力。

## 2. 证据来源与判定规则

已核验来源：

- `apps/backend/src/migration-scripts/initial-data-seed.ts`
- `plans/2026-05-02-hth-59-first-batch-sku-supply-chain-evidence.md`
- `plans/2026-05-03-hth-71-three-source-backed-sku-evidence.md`
- `plans/2026-05-03-hth-59-supply-chain-consolidation.md`
- `plans/2026-05-03-hth-53-final-sku-admission-matrix.md`

判定规则：

- `source-backed`：已有真实 supplier 名称、公开 source 链接，且页面能看到价格或报价区间、MOQ，以及部分材质/尺寸/重量/样品/交期字段。
- `placeholder only`：可以保留为 preview 导流或意向采集位，但不能当作已验证商品素材。
- `public preview`：允许作为 customer-facing preview 身份出现，但仍只能使用自有图或占位图，不能直接复用 supplier 图。
- `live pilot ready`：本轮仍为 `0`，因为图片授权、样品验货、履约口径与售后边界均未闭环。

## 3. 当前图片与样品基础事实

### 3.1 当前 storefront 图片状态

- 当前 9 个 SKU 位使用的图都来自 `initial-data-seed.ts` 中的 `images.unsplash.com` 外链，占位用途明确。
- 这些图能证明“当前 storefront 有稳定 placeholder 视觉素材”，不能证明“这是商品实拍图”或“这是 supplier 授权商品图”。
- 因此当前所有 SKU 位都应视为 `preview placeholder imagery only`。

### 3.2 当前样品状态

- 后端 metadata 统一写了 `product_info.sample_verified=false`。
- 这代表当前没有任何一个 preview SKU 完成“样品到手并验货通过”的状态闭环。
- 即便 `HTH-71` 已为 3 个候选位找到真实 supplier page，也仍停留在“可申请样品 / 样品信息部分可见”的阶段。

## 4. 9 个 SKU 位证据总表

| Slot | 当前 storefront 身份 | 供应链状态 | 图片授权状态 | 样品状态 | 履约/售后状态 | 当前允许级别 | 素材替换优先级 | Owner / next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OG-CS-01` | `OG-CS-R1 Kinggear Collapsible Camping Tool Bag` | `source-backed replacement candidate` | Supplier 图可见，但商品页复用授权未拿到；前台只能继续用 Unsplash/自有图 | 可申请样品；sample card 为 US$20；`Sample Time: 7 days after details confirmed`；未有真实单号/到达/验货记录 | Zhejiang 发货主体；量产交期 `30 days after customized sample confirmed`；仅见部分付款与 FBA 支持口径；无公开 replacement/refund SLA | `placeholder only` | `1. 主图 2. 细节图 3. 场景图` | 供应链协调补图片授权、样品实称、样品记录，并核对 `Waterproof`/净重冲突 |
| `OG-CS-02` | `Hanging Camp Shelf Organizer` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个真实低风险 storage 候选 |
| `OG-CS-03` | `Camp Essentials Pouch Set` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个真实 pouch-set 候选 |
| `OG-CA-01` | `OG-CA-R1 Camping Tableware Hanging Bag` | `source-backed replacement candidate` | Supplier 图可见，但无书面商品页复用授权；前台只能用 Unsplash/自有图 | Public page 标 `Sample: Available`；未公开 exact ETA；无真实单号/到达/验货记录 | Shanghai port；delivery time `15-20 days`；payment 为 `T/T, Paypal`；无独立 replacement/refund SLA | `public preview` | `1. 主图 2. 细节图 3. 场景图` | 供应链协调补书面图片授权、样品单号与验货；运营总监 + 供应链协调补国家/时效/DDU/DDP |
| `OG-CA-02` | `Nesting Pot Protector Set` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个低风险 cookware separator 候选 |
| `OG-CA-03` | `Compact Utensil Roll` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个低风险 utensil organizer 候选 |
| `OG-TR-01` | `OG-TR-R1 Small Utility Tool Pouch` | `source-backed replacement candidate` | Supplier 图可见，但无书面商品页复用授权；前台只能用 Unsplash/自有图 | FAQ 写 `FREE stock samples for your reference`；rush service `24-96 hours after artwork confirmation`；无真实单号/到达/验货记录 | Dongguan 发货主体；FAQ 列出 sea/air/DHL/UPS/Fedex；`refund` 或 `remake` 口径存在，但未形成我方书面确认 | `public preview` | `1. 主图 2. 细节图 3. 场景图` | 供应链协调补图片授权、样品记录、最终尺码冻结；运营总监 + 供应链协调补国家/时效/DDU/DDP |
| `OG-TR-02` | `Zipper Pull & Cord Keeper Set` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个低风险 cord-keeper 候选 |
| `OG-TR-03` | `Compression Strap Keeper Set` | `conceptual only`，无真实 supplier | 只能用现有占位图 | 无样品 | 无履约口径 | `placeholder only` | `先不补图，先补真实 source` | 供应链协调先找到第一个低风险 strap-keeper 候选 |

## 5. 3 个 source-backed 候选位的详细结论

### 5.1 OG-CS-01 -> OG-CS-R1

- 供应商：Ningbo Chanceca Import & Export Co., Ltd.
- 公开报价 / MOQ：
  - US$10.35 for 50-99
  - US$9.85 for 100-299
  - US$9.39 for 300+
  - MOQ 50
- 样品相关：
  - 可申请 sample
  - sample price 公开为 US$20
  - sample time 为 7 days after details confirmed
- 履约相关：
  - 发货主体在 Zhejiang, China
  - delivery time 为 30 days after customized sample confirmed
  - FAQ 提到 20-40 days mass production 和 FBA support
- 关键风险：
  - 标题写 `Waterproof`，但基础信息又写 `Not Waterproof`
  - 页面未公开净重，必须样品实称
  - 没有商品页复用图片授权
- 结论：
  - 当前只能 `placeholder only`
  - 在图片授权、净重、口径冲突没解决前，不建议把它升级为 public-preview 真商品素材

### 5.2 OG-CA-01 -> OG-CA-R1

- 供应商：Yangzhou Dandelion Outdoor Equipment Co., Ltd.
- 公开报价 / MOQ：
  - US$8.50 for 300-499
  - US$8.30 for 500-999
  - US$7.80 for 1000+
  - MOQ 500
- 样品相关：
  - public page 标 `Sample: Available`
  - exact sample ETA 未公开
- 履约相关：
  - Port 为 Shanghai, China
  - delivery time 为 15-20 days
  - payment terms 为 `T/T, Paypal`
- 关键风险：
  - 无图片复用书面授权
  - 无样品到货/验货记录
  - 不支持 `food-safe`、`heat-resistant`、`cookware performance` 等 claims
- 结论：
  - 可做 `public preview`
  - 但前台仍只能用自有图/占位图；不要直接复用 supplier 图

### 5.3 OG-TR-01 -> OG-TR-R1

- 供应商：Dongguan Runhong Sports Products Co., Ltd.
- 公开报价 / MOQ：
  - US$1.00
  - MOQ 300
- 样品相关：
  - FAQ 写 `FREE stock samples for your reference`
  - logo sample 另计 mold charge
  - rush service 为 24-96 hours after artwork confirmation
- 履约相关：
  - 发货主体在 Dongguan, Guangdong, China
  - FAQ 提到 sea / air / DHL / UPS / Fedex
  - flaw 处理口径写有 `refund` 或 `remake`
- 关键风险：
  - 无图片复用书面授权
  - 尺码族口径未最终冻结
  - 不支持 tactical / emergency / first-aid / repair outcome claims
- 结论：
  - 可做 `public preview`
  - 但前台仍只能用自有图/占位图；不要直接复用 supplier 图

## 6. 素材替换优先级

### 6.1 对已有 source-backed 的 3 个位

优先级统一为：

1. 主图
2. 细节图
3. 场景图

原因：

- 主图最直接影响“访客是否误以为这是实拍/授权商品图”。
- 在没有授权前，细节图和场景图补再多，也不能改变主图的误导风险。
- 因此这 3 个位最小可执行动作不是“立刻扩图册”，而是“先拿书面授权，或者自己做一套 owned-neutral imagery”。

### 6.2 对仍是 conceptual 的 6 个位

- 暂不建议优先补图。
- 正确顺序应为：先补真实 supplier/source，再决定要不要做主图。
- 在没有真实 candidate 前补图，只会把 placeholder 做得更像“真商品”，风险高于收益。

### 6.3 当前 storefront 的最保守素材策略

- `OG-CS-01`、`OG-CA-01`、`OG-TR-01`：
  - 可以保留当前 placeholder 图继续做 preview 引导
  - 但必须视为 `not supplier-authorized product imagery`
- 其余 6 个位：
  - 可以继续保留纯文字 + placeholder 图
  - 不值得追加细节图或场景图制作

## 7. 当前 unblock owner / action

| 主题 | Owner | 下一动作 |
| --- | --- | --- |
| Supplier 图片授权 | 供应链协调 | 向 `OG-CS-R1`、`OG-CA-R1`、`OG-TR-R1` supplier 补书面授权，明确是否允许 storefront PDP 使用 |
| 样品记录 | 供应链协调 | 发样或索样后记录 sample order id、下单日期、预计到达日期、实际到达日期、验货结论 |
| `OG-CS-R1` 净重与 `Waterproof` 冲突 | 供应链协调 | 样品实称并要求 supplier 澄清对外口径 |
| `OG-TR-R1` 最终展示规格 | 供应链协调 + 选品分析师 | 固定一个对外 display size/spec，避免前台继续漂移 |
| 履约国家、时效、DDU/DDP | 运营总监 + 供应链协调 | 固化 preview 范围、承运商路径、不可承诺文案 |
| 售后边界 | 供应链协调 | 补 supplier 对 replacement/refund/quality dispute 的书面口径 |

## 8. 对 HTH-82 的最小回传口径

`HTH-84` 当前已经把 preview SKU 的图片授权、样品与履约证据整理到可交付程度，核心结论如下：

- 9 个 SKU 位里，只有 3 个已有真实 source-backed 替代候选：`OG-CS-01`、`OG-CA-01`、`OG-TR-01`
- 其中允许 customer-facing `public preview` 的是 2 个：
  - `OG-CA-01` using `OG-CA-R1`
  - `OG-TR-01` using `OG-TR-R1`
- `OG-CS-01` using `OG-CS-R1` 仍只能 `placeholder only`
- 其余 6 个位仍是 `conceptual only`，当前不值得补真实商品素材
- 所有 9 个位当前都没有 supplier 图片复用授权闭环，也没有 `sample_verified=true`
- 因此当前最保守、可执行的内容策略是：
  - 继续允许 `2 个 public preview + 7 个 placeholder only`
  - `0` 个进入 live pilot
  - source-backed 的 3 个位先补主图授权或自有图，再谈细节图/场景图

## 9. 本任务完成定义

本任务的目标不是让 SKU 变成 live-ready，而是把 `HTH-82` 需要的图片授权、样品、履约证据和 owner/action 收敛成一个清晰包。

按这个标准，`HTH-84` 本轮已完成：

- 已把 9 个 SKU 位统一整理成一份图片授权/样品/履约证据表
- 已明确哪些位有 source-backed 候选，哪些仍只是 conceptual placeholder
- 已明确当前图片只能算 placeholder，不算 supplier 授权商品图
- 已明确样品和履约缺口，以及后续 unblock owner/action
