# HTH-99 商品详情页图文内容标准

关联任务：

- 父任务：[HTH-96](/HTH/issues/HTH-96)
- 视觉基线：[HTH-80](/HTH/issues/HTH-80) 对应文档 `docs/hth-80-visual-upgrade-spec.md`
- 选品矩阵：[HTH-83](/HTH/issues/HTH-83) 对应文档 `plans/2026-05-03-hth-83-preview-sku-operations-matrix.md`
- 图片/样品/履约证据：[HTH-84](/HTH/issues/HTH-84) 对应文档 `plans/2026-05-03-hth-84-preview-sku-evidence-pack.md`

## 1. 目标与适用范围

本标准只解决 PDP 主信息下方的图文详情区，不重复定义首屏标题、价格、CTA、规格选项等 above-the-fold 内容。

目标有三点：

1. 让 CTO 能基于现有 storefront 结构实现一个稳定的 `Product Detail Sections` 区域。
2. 让运营团队能按统一模板批量准备每个商品的详情文案、图片和缺失素材清单。
3. 让 preview-only 商品页看起来像“可审阅的商品目录”，而不是只有基础标题、价格和图库的半成品页面。

当前代码基线：

- `apps/storefront/src/modules/products/templates/index.tsx`
- `apps/storefront/src/modules/products/templates/product-info/index.tsx`
- `apps/storefront/src/modules/products/components/product-actions/index.tsx`
- `apps/storefront/src/modules/products/components/product-tabs/index.tsx`
- `apps/storefront/src/modules/products/utils/preview-metadata.ts`

建议实现位置：

- 保留现有首屏 `ProductInfo + ProductActions + ProductTabs` 的“短信息”职责。
- 新增一个全宽图文详情区，插入在主商品区之后、`RelatedProducts` 之前。
- `ProductTabs` 继续承担轻量规格/预览状态摘要；长图文不要继续塞进右侧 sticky 栏。

## 2. 信息架构总则

商品详情下方图文区固定按以下顺序组织：

1. `Scene + Value` 场景与核心价值
2. `Feature Breakdown` 卖点拆解
3. `Materials + Structure` 材质与结构
4. `Size + Specs` 尺寸与关键规格
5. `In the Box` 包装清单
6. `Use Cases + Fit` 使用场景、适用人群与注意事项
7. `Preview Note` preview / sourcing 状态说明

发布规则：

- `Scene + Value`
- `Feature Breakdown`
- `Materials + Structure`
- `Size + Specs`
- `Use Cases + Fit`
- `Preview Note`

以上 6 个模块为 `public preview` 的必备集。

`In the Box` 为强烈建议模块：

- 单件商品可写成 `1 main pouch`、`1 organizer bag` 这类最小清单。
- 如果连“是否单件”都无法确认，该 SKU 不应进入完整 PDP 标准，应停留在 `placeholder only` 或在 `Preview Note` 明示待确认。

## 3. 模块级标准

### 3.1 Scene + Value

用途：回答“这是什么商品，解决什么整理/使用问题，为什么值得继续往下看”。

内容标准：

- 标题：5-10 个英文词。
- 正文：35-60 个英文词。
- 卖点 bullet：3 条，每条 6-14 个英文词。
- 图片：1 张横向场景图，建议 `4:3`。

视觉标准：

- 桌面端采用左右分栏，图片与文案各占约一半宽度。
- 移动端改成单列，图片在上、文案在下。
- 文案区域最大行宽不超过 `68ch`。

禁止事项：

- 不要在这里复述价格、库存、CTA。
- 不要把未经验证的性能词写成主价值，例如 `waterproof`, `heavy-duty`, `food-safe`, `repair-ready`。

### 3.2 Feature Breakdown

用途：把抽象价值拆成 3 个可被图片和短文支持的卖点。

内容标准：

- 固定 3 张 feature cards。
- 每张卡包含：
  - 标题：2-5 个英文词
  - 正文：18-35 个英文词
  - 配图：1 张细节或结构图，建议 `1:1` 或 `4:5`

视觉标准：

- 桌面端 3 列卡片。
- 移动端 1 列堆叠。
- 不使用轮播；用户应一次看到全部 3 个卖点。

适用写法：

- 口袋分区
- 开口方式
- 折叠/收纳形态
- 挂载/摆放方式
- 可见的结构细节

### 3.3 Materials + Structure

用途：给出“可确认的物理事实”，避免长段营销腔。

内容标准：

- 1 段 25-50 词的结构说明。
- 4-8 条 specs。
- 1 张材质或结构特写图。

优先字段：

- `Material`
- `Lining` / `Shell` / `Body`
- `Closure`
- `Pocket count`
- `Handle` / `Carry detail`
- `Hanging method`
- `Fill` / `Insulation` / `Valve` / `Frame`

发布规则：

- 没有确认的数据不显示。
- 不允许出现 `-`、`TBD`、空白 label。
- 若材质只确认到宽泛层级，可用保守表达，例如 `textile body`, `mesh pocket panels`, `zip closure`。

### 3.4 Size + Specs

用途：让用户形成尺寸、容量、收纳体积和组合关系的直觉。

内容标准：

- 4-6 条关键规格。
- 至少包含以下其一：
  - `Dimensions`
  - `Packed size`
  - `Capacity`
  - `Set count`
  - `Weight`

图片标准：

- 1 张尺度参考图，优先 top-down flat lay 或与常见物体对比图。
- 建议比例 `4:3`。

发布规则：

- 如 exact net weight、最终 display size 尚未冻结，不要猜测。
- 缺失规格要转入 `Preview Note`，写成 `Final display size pending sourcing confirmation` 这类状态句。

### 3.5 In the Box

用途：回答用户“实际会看到哪些部件或件数”。

内容标准：

- 单件商品：1-3 条。
- 套装商品：3-6 条。
- 每条采用名词短语，不写夸张形容词。

示例：

- `1 main organizer bag`
- `2 mugs with press-fit lids`
- `8 organizer zones in one hanging panel`

发布规则：

- 如果件数或包含关系未确认，不做假设。
- 对于概念阶段 SKU，可暂不显示此模块，但必须在 `Preview Note` 说明“included items pending confirmation”。

### 3.6 Use Cases + Fit

用途：帮助用户判断“适合谁、适合什么场景、不适合承诺什么”。

内容标准：

- `Use cases`：固定 3 条。
- `Best for`：1 句，15-25 词。
- `Notes`：2-3 条注意事项，每条 10-20 词。

优先写法：

- 使用环境：car camping, basecamp setup, trailhead sorting, camp kitchen setup
- 用户画像：camp organizers, weekend campers, hikers needing small accessory control
- 边界说明：不承诺天气性能、不承诺修复结果、不承诺食品接触安全

### 3.7 Preview Note

用途：把 preview store 的限制写清楚，让页面可信而不是回避缺口。

内容标准：

- `Confirmed now`：2-4 条
- `Pending review`：2-4 条
- `Do not claim`：1-3 条

文案语气：

- 中性、透明、像 sourcing review 说明。
- 不要写成“抱歉我们还没准备好”的弱势语气。

示例句式：

- `Material family and organizer format are confirmed for preview review.`
- `Final shipping policy and live ordering remain inactive.`
- `Do not claim waterproof protection or load-bearing performance at this stage.`

## 4. 视觉与版式验收

本区块沿用 `docs/hth-80-visual-upgrade-spec.md` 的间距和字体层级，补充以下专属标准：

- 模块之间桌面端间距 `72-88px`，移动端 `40-48px`。
- 每个主模块最多 1 个主标题，避免副标题层层叠加。
- 图文区禁止再次出现与首屏 CTA 等权重的浅绿色大提示框。
- 不使用详情区内部轮播、自动切换、tab 套 tab。
- 详情区至少提供 2 张下折图：`1 张场景图 + 1 张细节/尺度图`。
- 如果素材足够，推荐 3 张：`scene`, `detail`, `scale/in-box`。
- 图片统一使用自然环境光或干净棚拍，不混入强烈品牌字样、水印或未经授权的供应商图。

移动端验收：

- 每个模块都应在单列内完成阅读，不依赖横向滑动。
- 图片在 `320px` 宽度下不应把正文压缩到 10 个词以下一行。
- `In the Box`、`Use Cases`、`Preview Note` 应保持竖向节奏清楚，不要挤成一块大文字墙。

## 5. Preview-safe 文案边界

结合 [HTH-83](/HTH/issues/HTH-83) 与 [HTH-84](/HTH/issues/HTH-84)，运营准备文案时执行以下规则：

- 可以写：organizer, grouped storage, compact carry, stitched dividers, hanging format, zipper closure, preview spec, sample ETA pending
- 暂不写：waterproof, food-safe, heavy-duty, certified, universal fit, repair outcome, thermal rating, guaranteed durability
- 如需写尺寸、容量、件数、材质，必须能被 source、sample 或已冻结的 seed 数据支持
- 若图片版权未清，不使用 supplier product photos 直接上前台；优先自有拍摄或生成中性无品牌图片

## 6. 每个 SKU 的最小素材包

每个完整 PDP 至少准备以下 3 类素材：

1. `Scene image`
   - 展示商品在真实使用环境中的角色
   - 比例建议 `4:3`
2. `Detail image`
   - 展示缝线、材质、开口、口袋、挂点、阀门等
   - 比例建议 `1:1` 或 `4:5`
3. `Scale / in-box image`
   - 展示件数、折叠状态或与常见物体的尺度对比
   - 比例建议 `4:3`

如无真实拍摄素材，生成图提示必须满足：

- 无品牌 logo
- 无人物面部主导画面
- 无夸张性能暗示
- earth-tone 或中性背景
- 符合电商目录风格，不做广告海报

## 7. 代表性商品样例与生成提示

以下样例优先选自 [HTH-83](/HTH/issues/HTH-83) 当前建议继续推进的 category anchor / priority lane。

### 7.1 `OG-CS-01` Kinggear Collapsible Camping Tool Bag

可用定位：

- camp organizer bag
- grouped camp storage
- collapsible setup accessory storage

`Scene + Value` 样例：

- Title: `Keep setup tools grouped from trunk to campsite`
- Body: `A soft organizer-bag format for campers who want gloves, cords, stakes, and loose setup accessories kept together during packing, transport, and teardown. Position it as flexible camp storage rather than a protective hard case.`
- Bullets:
  - `Wide opening for quick visual sorting`
  - `Collapsible body stores flatter off duty`
  - `Pocket zones separate loose camp pieces`

`Feature Breakdown` 方向：

- `Open-top visibility`
- `Collapsible soft body`
- `Interior and exterior pocket zoning`

图片生成提示：

- Scene: `Unbranded soft camping organizer bag on a vehicle tailgate with work gloves, cords, and small camp accessories visible, natural daylight, realistic campsite, earth-tone palette, ecommerce editorial style`
- Detail: `Macro close-up of stitched handles, zipper track, and pocket seams on a neutral olive camp organizer bag, clean studio lighting, no branding`
- Scale: `Top-down flat lay of a collapsible camp organizer bag beside a 1L bottle, gloves, and a small stakes pouch, neutral background, realistic proportions`

注意：

- 不写 `waterproof`, `heavy-duty`, `load-bearing`
- 若最终净重未确认，转入 `Preview Note`

### 7.2 `OG-CA-01` Camping Tableware Hanging Bag

可用定位：

- camp kitchen organizer
- tableware bag
- hanging kitchen storage

`Scene + Value` 样例：

- Title: `Separate camp tableware without a hard kitchen box`
- Body: `Present the product as a soft hanging organizer for utensils, cloths, napkins, and lightweight tableware pieces. The core value is cleaner kitchen packing separation, not food-safety or cookware protection claims.`
- Bullets:
  - `Divider zones keep small items sorted`
  - `Hanging format suits kitchen canopy setups`
  - `Folded storage stays easy to pack`

`Feature Breakdown` 方向：

- `Stitched divider layout`
- `Hang or fold storage behavior`
- `Kitchen-side access to small pieces`

图片生成提示：

- Scene: `Unbranded hanging camp kitchen organizer attached to a canopy or vehicle-side cooking setup, utensils, cloth, and lightweight tableware visible, no food branding, natural daylight`
- Detail: `Close-up of stitched divider pockets, hanging webbing, and fold-over closure on a textile kitchen organizer, studio detail photography`
- Scale: `Flat lay of one hanging tableware organizer shown open and folded, with napkin, spoon, and small towel for scale, neutral background`

注意：

- 不写 `food-safe`, `heat-resistant`, `BPA-free`, `washable guarantee`
- 如果 included items 不是随包附送，而只是使用示意，必须在图片 caption 或运营素材说明里区分清楚

### 7.3 `OG-TR-01` Small Utility Tool Pouch

可用定位：

- small utility pouch
- accessory pouch
- compact trail setup storage

`Scene + Value` 样例：

- Title: `Corral small cords and trail accessories in one place`
- Body: `Frame the product as a compact pouch for grouping cords, patches, small tools, or other loose accessories inside a pack, glove box, or camp bin. Keep the value on organization, not tactical or repair-result language.`
- Bullets:
  - `Compact footprint fits pack corners easily`
  - `Zip closure keeps loose items grouped`
  - `Neutral pouch format works across trip types`

`Feature Breakdown` 方向：

- `Compact zip access`
- `Small-item grouping`
- `Pack or vehicle drop-in storage`

图片生成提示：

- Scene: `Small unbranded utility pouch half-open inside a hiking backpack or vehicle glove box with cords and small camp accessories visible, realistic outdoor-travel context, no tactical styling`
- Detail: `Studio macro shot of zipper pull, seam finish, and pouch fabric texture on a neutral utility pouch, no logo`
- Scale: `Flat lay of one compact utility pouch beside cord keepers, patch kit envelope, and a hand-size notebook, neutral background`

注意：

- 不写 `tactical`, `emergency`, `repair fix`, `protective`, `waterproof`
- 如果最终 display size 未冻结，尺寸模块只展示已确认字段，其余转入 `Preview Note`

## 8. CTO 可落地的数据与组件内容契约建议

建议保留现有 `metadata.product_info` 作为首屏短信息来源，并新增 `metadata.product_detail` 作为下方图文详情区数据源。

推荐内容契约：

```json
{
  "product_detail": {
    "version": 1,
    "modules": [
      {
        "type": "scene_value",
        "title": "Keep setup tools grouped from trunk to campsite",
        "body": "A soft organizer-bag format for campers who want gloves, cords, stakes, and loose setup accessories kept together during packing, transport, and teardown.",
        "bullets": [
          "Wide opening for quick visual sorting",
          "Collapsible body stores flatter off duty",
          "Pocket zones separate loose camp pieces"
        ],
        "image": {
          "src": "owned-or-generated-image-url",
          "alt": "Camping tool bag holding setup accessories on a tailgate",
          "ratio": "4:3",
          "kind": "scene"
        }
      },
      {
        "type": "feature_breakdown",
        "items": [
          {
            "title": "Open-top visibility",
            "body": "Wide access keeps setup pieces easier to sort at camp.",
            "image": {
              "src": "detail-image-url",
              "alt": "Wide opening detail of the organizer bag",
              "ratio": "1:1",
              "kind": "detail"
            }
          }
        ]
      },
      {
        "type": "materials_structure",
        "title": "Materials and structure",
        "body": "Use conservative construction language tied to visible seams, closures, and panel layout.",
        "specs": [
          { "label": "Material", "value": "Textile body" },
          { "label": "Closure", "value": "Zip closure" }
        ],
        "image": {
          "src": "macro-image-url",
          "alt": "Close-up of seams and zipper",
          "ratio": "4:5",
          "kind": "macro"
        }
      },
      {
        "type": "size_specs",
        "specs": [
          { "label": "Dimensions", "value": "40 x 18 x 22 cm" },
          { "label": "Packed profile", "value": "Collapsible soft body" }
        ],
        "image": {
          "src": "scale-image-url",
          "alt": "Organizer bag with common objects for scale",
          "ratio": "4:3",
          "kind": "scale"
        }
      },
      {
        "type": "in_the_box",
        "items": ["1 main organizer bag"]
      },
      {
        "type": "use_cases_fit",
        "useCases": [
          "Car-camp setup",
          "Basecamp storage",
          "Vehicle gear sorting"
        ],
        "bestFor": "Campers who want flexible accessory grouping instead of a rigid storage box.",
        "notes": [
          "Do not position as waterproof protection.",
          "Do not promise load-bearing performance."
        ]
      },
      {
        "type": "preview_note",
        "confirmed": [
          "Organizer format and core storage use are confirmed.",
          "Preview-only launch update flow remains active."
        ],
        "pending": [
          "Final display size may still be refined.",
          "Image-rights clearance may still be pending."
        ],
        "doNotClaim": [
          "Waterproof protection",
          "Heavy-duty durability"
        ]
      }
    ]
  }
}
```

组件规则建议：

- 渲染器按 `modules[]` 顺序输出，不在前端硬编码每个 SKU 的版式顺序。
- `feature_breakdown` 固定渲染 3 项；不足 3 项时不进入完整 PDP 发布态。
- `materials_structure` 与 `size_specs` 中的空字段直接隐藏，不渲染空 label。
- `preview_note` 始终显示，作为 preview-only 商店的可信度说明。
- 图片字段只接收自有或可用授权素材 URL；若只存在“概念图提示”，则在 CMS/数据层先生成成品 URL 再入前端。

## 9. 运营批量准备清单

每个 SKU 建一个内容包，最少包含：

- 1 个 `scene_value` 标题、正文、3 条 bullets
- 3 个 `feature_breakdown` 子卡
- 1 组 `materials_structure` 文案和 4-8 条 specs
- 1 组 `size_specs`
- 1 组 `in_the_box`
- 3 个 `use cases`
- 1 组 `preview_note`
- 3 张下折图：scene / detail / scale-or-in-box

批量审核通过标准：

- 页面下折区不再出现只有大段 description 的情况
- 所有 claims 都能对应到 [HTH-83](/HTH/issues/HTH-83) 允许范围或已确认 seed/source 字段
- 没有裸露的 `-`、`TBD`、空模块标题
- 即使素材暂时是生成图，图片风格也统一、无品牌风险、无夸张性能暗示

这份标准可以直接作为 CTO 的组件输入定义和运营的商品详情素材模板。
