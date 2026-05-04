# HTH-59 首批 SKU 供应链证据汇总

Created: 2026-05-03 15:05 Asia/Shanghai
Owner: 供应链协调
Source issue: HTH-59
Upstream evidence: HTH-71, HTH-53

## 1. 用途

本文件把 `HTH-59` 先前的缺口盘点，与 `HTH-71` 已完成的 3 个 source-backed 候选补证据结果，合并成一份可直接回传给 `HTH-53` 的供应链结论。

本汇总只回答两件事：

1. 9 个候选位里，哪些现在有真实供应页和公开商业参数支撑。
2. 哪些位可以进入 `public preview`，哪些仍只能 `placeholder only`，以及为什么仍然 `0` 个可进入 live pilot。

## 2. 证据来源

- 历史缺口盘点：
  `/home/paperclip/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-02-hth-59-first-batch-sku-supply-chain-evidence.md`
- 3 个 source-backed 候选位证据：
  `/home/paperclip/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-03-hth-71-three-source-backed-sku-evidence.md`
- 9 位准入矩阵底稿：
  `/home/paperclip/.paperclip/instances/default/projects/7d441a0a-ea38-4560-933c-1a99148ca59d/e0888731-3d24-4593-8225-5ae0d59c455a/outdoor-gear-shop/plans/2026-05-02-hth-53-sku-admission-evidence-matrix.md`

## 3. 汇总结论

- 已批准的 3 个类目和 9 个候选位结构不变。
- 其中 3 个优先候选位，已经从 `seed / conceptual` 推进到 `source-backed replacement candidates`。
- 当前最保守且可执行的口径是：
  - `2 个可进 public preview`
  - `7 个继续 placeholder only`
  - `0 个可进入 live pilot`
  - `0 个需要立即 reject`

## 4. 9 位最终状态快照

| 候选位 | 类目 | 当前采用口径 | 供应链状态 | Preview 判定 | Live pilot 判定 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `OG-CS-01` | Camp Storage | 以 `OG-CS-R1 Kinggear Collapsible Camping Tool Bag` 替代原 `Trail Camp Starter Kit` 语义 | 有真实 source-backed supplier page | `placeholder only` | 不可 live | 标题与属性存在 `Waterproof` 口径冲突，净重缺失，图片授权未完成 |
| `OG-CS-02` | Camp Storage | Hanging Camp Shelf Organizer | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |
| `OG-CS-03` | Camp Storage | Camp Essentials Pouch Set | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |
| `OG-CA-01` | Cookware Accessories | 以 `OG-CA-R1 Camping Tableware Hanging Bag` 替代原 `Nesting Camp Cookware Organizer` 语义 | 有真实 source-backed supplier page | `public preview` | 不可 live | 仅可用自有/占位图；不能写 food-safe、heat-resistant、cookware performance |
| `OG-CA-02` | Cookware Accessories | Nesting Pot Protector Set | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |
| `OG-CA-03` | Cookware Accessories | Compact Utensil Roll | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |
| `OG-TR-01` | Trail Repair & Utility Pouches | 以 `OG-TR-R1 Small Utility Tool Pouch` 替代原 `Trail Repair Pouch` 语义 | 有真实 source-backed supplier page | `public preview` | 不可 live | 必须使用中性 `utility pouch` 命名；不得写 tactical、emergency、first-aid、repair outcome |
| `OG-TR-02` | Trail Repair & Utility Pouches | Zipper Pull & Cord Keeper Set | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |
| `OG-TR-03` | Trail Repair & Utility Pouches | Compression Strap Keeper Set | 仍无真实 source | `placeholder only` | 不可 live | 保留概念位 |

## 5. 对原始 seed 命名的处理

以下 3 个 seed 名称不建议继续作为最终公开商品身份使用：

- `Trail Camp Starter Kit`
- `Nesting Camp Cookware Organizer`
- `Trail Repair Pouch`

原因不是类目被否决，而是没有找到与这些 seed 名称一一对应、且低风险可核验的真实供应页。`HTH-53` 应把这 3 个候选位改写为各自的 source-backed 替代口径，而不是把 seed 名称继续当作事实商品。

## 6. 进入 public preview 的限制

当前可进入 `public preview` 的只有 2 位：

1. `OG-CA-01` -> `OG-CA-R1`
2. `OG-TR-01` -> `OG-TR-R1`

进入 preview 时仍必须遵守：

- 使用自有图、占位图或后续拿到授权的图，不直接复用 supplier 图。
- 文案只写中性收纳/整理用途，不写性能、认证、食品安全、防护、应急、承重或结果型 claims。
- taxonomy 使用 `Trail Repair & Utility Pouches`，不要回退到更宽泛的 `Trail Accessories`。

## 7. 仍未完成但已明确 owner 的字段

这些字段已不再阻止 `HTH-59` 完成“证据汇总”目标，但会继续阻止 live pilot：

| 字段 | 当前 owner | 下一动作 |
| --- | --- | --- |
| 图片授权书或允许商品页使用的明示回复 | 供应链协调 | 向对应 supplier 补书面授权 |
| 样品单号、到达日期、验货结论 | 供应链协调 | 发样并补样品记录 |
| replacement / refund / quality dispute 边界 | 供应链协调 | 向 supplier 补售后条款 |
| 承运商、可配送国家、时效、DDU/DDP | 供应链协调 + 运营总监 | 固化 preview 范围和物流口径 |
| `OG-CS-R1` 净重与属性冲突核对 | 供应链协调 | 样品实称并核对 `Waterproof` 口径 |
| `OG-TR-R1` 最终尺码版本 | 供应链协调 + 选品分析师 | 固定对外展示的单一规格 |

## 8. 回传给 HTH-53 的最小执行口径

`HTH-53` 恢复后，应按以下口径更新 9 位准入表：

- `public preview`:
  - `OG-CA-01` using `OG-CA-R1`
  - `OG-TR-01` using `OG-TR-R1`
- `placeholder only`:
  - `OG-CS-01` using `OG-CS-R1`
  - `OG-CS-02`
  - `OG-CS-03`
  - `OG-CA-02`
  - `OG-CA-03`
  - `OG-TR-02`
  - `OG-TR-03`
- `reject`:
  - none at the slot level in this round

## 9. 本任务完成定义

`HTH-59` 的目标是把首批候选 SKU 的供应链证据补齐到“可供商品准入决策使用”的程度，并明确 blocker owner/action。

基于 `HTH-71` 已交付的 3 个 source-backed 候选位，本任务现在已完成：

- 已有 1 份缺口盘点表
- 已有 1 份 3 个优先候选位的真实供应链证据表
- 已形成 9 位级别的最终供应链状态建议
- 已明确下游 `HTH-53` 和 live pilot 前剩余 owner/action
