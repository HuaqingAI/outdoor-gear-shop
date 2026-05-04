# HTH-80 视觉升级方案与排版验收标准

## 审查范围

本次基于当前 storefront 代码结构审查以下页面和组件：

- 首页：`apps/storefront/src/app/[countryCode]/(main)/page.tsx`
- 首页 Hero / 产品 rail：`src/modules/home/components/hero`、`src/modules/home/components/featured-products`
- 全部商品 / 集合 / 分类页：`src/modules/store/templates`、`src/modules/collections/templates`、`src/modules/categories/templates`
- 商品详情页：`src/modules/products/templates`、`product-info`、`product-tabs`、`product-actions`
- Preview CTA 体系：`src/modules/preview/components/preview-intent-panel`、`preview-intent-form`
- 全局 UI：`src/modules/common/components/ui`、`src/styles/globals.css`
- 导航 / 页脚：`src/modules/layout/templates/nav`、`footer`

结论先行：当前问题核心不是“颜色不够多”，而是信息层级不稳定、CTA 重复、图片比例不一致、客户可见区域仍带有 demo 气质。`blog/event` 独立模板目前在 repo 中不存在，只有 policy 类内容页，因此要把“现有视觉缺口”和“后续内容面建设”拆开执行。

## CTO 实施优先级

1. 商品详情页信息结构与 Preview CTA 统一
2. 列表页（store / collection / category）头部、筛选与卡片密度
3. 首页 Hero 与产品 rail 的品牌感提升
4. 全局按钮、卡片、图片比例与页脚清理
5. 内容页模板补充（如本轮确实需要 blog / 活动流量承接）

## 设计方向

建议本轮不要做重品牌改造，直接在现有深绿预览主题上收敛：

- 气质：山野装备目录 / sourcing preview，而不是通用电商 demo
- 关键词：克制、耐用、信息清楚、可信、非营销腔
- 颜色策略：保留深绿与浅雾绿，但减少大面积“淡绿提示框”重复出现
- 字体策略：本轮可继续使用现有 sans 体系，不强依赖新增字体文件；靠字号、字重、间距建立层级

## 全局验收标准

### 1. 布局与留白

- 采用 8px 栅格。
- 桌面端主 section 间距：72px 到 96px。
- 移动端主 section 间距：40px 到 56px。
- 卡片内边距：桌面 24px，移动 16px 到 20px。
- 正文文本行宽控制在 64 到 72 个英文字符以内，避免横向过长。
- 文本型信息块不要直接铺满 `1440px` 容器宽度；图片区可宽，文字区必须收窄。

### 2. 字体层级

- 首页 H1：桌面 `56/64`，移动 `36/42`，字重 600。
- 页面主标题 / 商品标题：桌面 `40/46`，移动 `28/34`，字重 600。
- Section 标题：桌面 `32/38`，移动 `24/30`，字重 600。
- 正文：`16/24` 或 `16/26`。
- 次级说明：`14/22`。
- 标签 / eyebrow / badge：`12/16`，可使用轻微大写和 `0.04em` 到 `0.08em` tracking。

### 3. 按钮与交互控件

- 主次按钮高度：桌面 48px，移动 44px。
- 按钮圆角：12px。
- 水平内边距：16px 到 20px。
- 所有主 CTA 文案需垂直居中，不允许裁切、顶边、底边贴死。
- focus 状态必须可见，不能只依赖 hover。
- 同一业务动作只能保留一套主 CTA 文案，不能一处写 `Get launch updates for this item`，另一处写 `Request launch updates`。

### 4. 卡片与图片比例

- 商品卡图片比例必须统一，建议列表页统一为 `4:5` 或接近比例；不能首页一套、列表页一套、详情图再一套极端长图。
- 商品卡信息层建议固定为：
  - 商品名
  - 次级信息一行（collection / type / preview badge 二选一组合）
  - 不在卡片里塞长段描述
- hover 只做轻微阴影 / 边框变化，不要依赖复杂动效表达层级。

### 5. 空数据处理

- 商品规格区不应大量展示 `-`。
- 若关键字段缺失超过 3 项，优先隐藏空行，并以一句次级说明替代，如“Specs still under sourcing review”。
- 没有内容的栏目不要为了凑版面强行露出。

## 页面级方案

### A. 首页

#### 现状问题

- Hero 过高，首屏被通用风景图占据，和实际商品目录关联弱。
- 价值主张只有一句话，缺少 preview 模式解释和可信信息。
- collection rail 标题层级弱，商品卡只有标题 + `Preview only`，信息密度偏低。

#### 本轮必须完成

- Hero 降到更紧凑的首屏高度：
  - 桌面最大高度 640px
  - 移动端 420px 到 500px
- Hero 文案结构固定为：
  - eyebrow / 状态标签
  - 主标题
  - 一句价值主张
  - 主 CTA（浏览目录）
  - 次 CTA（了解 preview 机制或请求更新）
- Hero 下方增加 3 项 preview 信号带，例如：
  - Preview only
  - Sourcing review in progress
  - Collections / categories count
- collection rail 头部要有更明确的标题层级，`View all` 与标题基线对齐。
- 首页商品卡需加入更稳定的 preview badge 表达，避免只剩一行灰字。

#### 桌面端验收

- 首屏无需滚动即可同时看到标题、说明、主 CTA。
- Hero 文案区宽度受控，不能拉成超长一行。
- collection rail 每个 section 头部在视觉上明显强于卡片标题。

#### 移动端验收

- Hero 在 320px 宽下不出现 4 行以上的主标题换行。
- 两个 CTA 可上下堆叠，间距明确，不互相挤压。
- 商品卡仍保持统一图片比例，不因屏宽过窄出现忽长忽短。

### B. Store / Collection / Category 列表页

#### 现状问题

- 页面头部太薄，标题之外几乎没有上下文。
- Preview 表单直接塞在产品网格前，视觉权重过高，像主任务而不是辅助留资。
- 筛选栏、标题、商品网格之间缺少清晰节奏。
- 分类页和集合页的说明密度不一致。

#### 本轮必须完成

- 列表页头部统一为：
  - 标题
  - 1 句描述
  - 结果数 / 当前筛选状态
- Preview 留资区域改为辅助面板样式，不抢主标题和商品网格注意力。
- 桌面端筛选区宽度建议固定在 `240px` 到 `280px`。
- 移动端筛选必须折叠为 drawer / accordion，不允许压缩商品网格内容宽度。
- 商品卡标题最多 2 行；超出截断或压缩到统一高度。
- 集合页、分类页都应有足够的“为什么看这组商品”的说明，但不需要长篇。

#### 桌面端验收

- 用户进入列表页后，先读到“这是哪一类商品 + 当前有多少结果”，再看到留资表单。
- 商品网格和筛选区之间至少有 24px 清晰分隔。
- 首屏不会同时出现两个强主 CTA 区域竞争。

#### 移动端验收

- 筛选收起后，标题、说明、商品网格纵向顺序清楚。
- 留资面板可保留，但不应把第一屏全部占满。
- 两列卡片布局如果导致标题严重拥挤，可在 320px 降为一列。

### C. 商品详情页

#### 现状问题

- 当前三栏结构把信息切得太碎：左边说明、右边 CTA、中间图库，阅读路径不够自然。
- Preview CTA 体系重复：
  - `PreviewIntentPanel`
  - `ProductActions`
- CTA 文案不统一，且 `Get launch updates for this item` 长度偏长，容易在窄容器里产生换行/溢出。
- 商品描述、规格、preview 说明都偏轻，缺少“为什么值得关注”这一层。
- `ProductTabs` 中大量空值会直接显示为 `-`，质感差。

#### 本轮必须完成

- 商品详情页 above-the-fold 固定顺序：
  - collection breadcrumb
  - 商品标题
  - 一句短描述 / 核心用途
  - preview 状态 badge / 文案
  - 规格选项
  - 主 CTA
  - 次级说明
- Preview 主 CTA 统一使用 `Request launch updates`。
- 商品特定语义放在按钮上方说明文案里，不放进按钮正文。
- 只保留一个主 Preview 留资入口；`PreviewIntentPanel` 与 `ProductActions` 二选一，不能重复堆叠两个浅绿色提示框。
- 规格区隐藏空字段，避免成片的 `-`。
- 详情内容至少分成三类：
  - short summary
  - key specs
  - preview / sourcing status

#### CTA 换行 / 溢出专项验收

- 适用组件：
  - `src/modules/preview/components/preview-intent-panel`
  - `src/modules/products/components/product-actions`
  - 如有复用，也包括其他 preview CTA
- 首选修复方式：
  - 全站统一文案为 `Request launch updates`
  - 保持按钮为单行主 CTA
- 桌面端验收：
  - 在 `280px` 到 `320px` 宽的右侧操作栏内，主 CTA 单行展示
  - 文字水平居中
  - 无裁切、无超出按钮边界、无按钮高度塌缩
- 移动端验收：
  - 在 `320px` 到 `430px` 视口下，统一后的 CTA 仍应保持单行
  - 若业务坚持保留更长文案，则最多允许 2 行，按钮最小高度提升到 56px，同时保持上下 padding 对称
  - 不允许出现 3 行及以上换行、单词被截断、文字贴边

#### 桌面端验收

- 商品主信息和 CTA 在一个连续阅读区域里完成，不需要用户来回看左栏和右栏找主动作。
- 图库、说明、操作区主次清楚，最多只有 1 个高强调浅色提示卡。
- 相关商品区与主内容之间有明确分区，不像页面尾部残留内容。

#### 移动端验收

- 顺序必须是图片 -> 核心信息 -> CTA -> 规格 / 详情，而不是 CTA 被夹在多个重复卡片之间。
- 主 CTA 在首屏或首屏稍下即可看到。
- Accordion 展开后文本不拥挤，正文保持可读行高。

### D. 导航与页脚

#### 现状问题

- 页头可用，但品牌导航较弱，缺少 preview 模式入口说明。
- 页脚目前直接暴露 GitHub repo 与 Medusa docs，客户可见感知偏“样板工程”。
- 页脚纵向留白过大。

#### 本轮必须完成

- 保留当前简洁导航，但增加一个面向客户的 preview 说明入口或分类入口。
- 页脚移除对消费者无意义的 `GitHub repo`、`Documentation` 外链。
- 页脚内容保留：
  - categories / collections
  - preview policy
  - support / contact
- 页脚主区域高度压缩，减少大段空白。

### E. Blog / 活动 / 内容页

#### 当前状态

- 当前 repo 中未发现独立的 blog、journal、event、activity 模板。
- 现有 `content` 路由仅是 policy 类页面，不构成营销内容体系。

#### 建议判断

- 如果 [HTH-79](/HTH/issues/HTH-79) 本轮目标只是把 preview catalog 变得更可信，可不把 blog / 活动页作为阻塞项。
- 如果本轮还承担 SEO、品牌故事、活动导流职责，则至少补 2 个模板：
  - 内容列表页
  - 内容详情页 / 活动详情页

#### 如本轮要补模板，验收标准如下

- 列表页首屏要有主题标题、栏目说明、卡片网格。
- 详情页正文宽度控制在 `720px` 到 `760px`。
- hero 图比例建议 `16:9`。
- 必备 meta：日期、作者或活动状态、阅读时长或地点。
- 文末要有一个关联商品或 preview CTA，而不是只有正文结束。

## 本轮必须做 vs 后续内容补齐

### 本轮必须做（CTO / 前端实现）

- 统一 preview CTA 文案与按钮排版，解决商品详情 CTA 换行 / 溢出问题。
- 去掉商品详情页重复的 preview 提示卡与重复 CTA。
- 重构商品详情页 above-the-fold 信息顺序。
- 统一商品卡图片比例、标题高度、preview badge 表达。
- 提升首页 Hero 与 collection rail 的层级。
- 统一 store / collection / category 页头信息结构。
- 清理页脚中的开发者外链。
- 隐藏规格空字段，不再大量显示 `-`。

### 后续内容负责人补齐（不应阻塞本轮视觉实现）

- 每个 collection / category 的高质量一句话说明。
- 商品短描述、卖点 bullet、适用场景文案。
- 更完整的 specs / materials / dimensions 数据。
- 首页与内容页所需的真实品牌图、产品场景图。
- blog / event 正文内容、活动日历、field notes 素材。

## 给 [HTH-81](/HTH/issues/HTH-81) 的实施指引

优先改这些组件，能最快看到体感提升：

1. `src/modules/products/templates/index.tsx`
2. `src/modules/preview/components/preview-intent-panel/index.tsx`
3. `src/modules/products/components/product-actions/index.tsx`
4. `src/modules/common/components/ui/index.tsx`
5. `src/modules/store/templates/index.tsx`
6. `src/modules/collections/templates/index.tsx`
7. `src/modules/categories/templates/index.tsx`
8. `src/modules/home/components/hero/index.tsx`
9. `src/modules/home/components/featured-products/product-rail/index.tsx`
10. `src/modules/products/components/product-preview/index.tsx`
11. `src/modules/layout/templates/footer/index.tsx`

如果工期有限，先把商品详情页和列表页做对，再做首页气质提升；这是最直接影响转化理解与截图观感的部分。
