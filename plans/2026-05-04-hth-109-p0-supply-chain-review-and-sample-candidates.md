# HTH-109 P0 户外商品供应链复核与样品候选

Created: 2026-05-04 Asia/Shanghai
Owner: 供应链协调
Source issue: HTH-109
Parent issue: HTH-98

## 1. 使用口径

- 本文件覆盖 `HTH-98` 定义的 P0 12 款商品池。
- 每款至少列 2 个公开候选来源；已拿到历史 source-backed 证据的，沿用历史结论作为候选 A。
- 对公开页面没有给出的 `国内运费 / 包装尺寸 / 包装重量 / 售后 SLA / 图片授权 / 认证文件`，统一标为 `RFQ/索样补齐`。
- 为满足样品优先级决策，本表另给出一列 `样品决策估算`。这不是供应商已确认报价，只用于内部排样顺序，不可直接当采购事实。
- Alibaba `product-introduction` 页面中的生成式描述不作为采购事实；仅把其中可见的 `MOQ / 价格挡位 / 容量 / 尺寸` 当作候选线索，真正下单前仍要回到 listing 或 RFQ 核对。

## 2. 总体结论

- `建议可进 public preview`：7 款
  - `OG-PB-02`、`OG-CK-03`、`OG-TR-01`、`OG-PB-03`、`OG-TS-03`、`OG-TS-04`、`OG-SS-03`
- `建议先索样再决定是否进 public preview`：3 款
  - `OG-CF-01`、`OG-CF-02`、`OG-SS-02`
- `建议先留 coming soon，等文件/样品闭环后再转 preview`：2 款
  - `OG-LS-02`、`OG-CK-01`

样品优先级建议：

1. `A1` 立即索样：`OG-LS-02`、`OG-SS-02`、`OG-CF-01`、`OG-CK-01`
2. `A2` 第二批索样：`OG-CF-02`、`OG-PB-02`、`OG-CK-03`
3. `B` 可与 A2 同单或延后：`OG-TR-01`、`OG-PB-03`、`OG-TS-04`、`OG-TS-03`、`OG-SS-03`

## 3. 12 款复核表

| SKU | 商品 | 候选 A | 候选 B | 公开规格/商业参数 | 样品决策估算 | 图片授权/售后/合规 | 主要风险 | 推荐样品 SKU | Preview 建议 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `OG-PB-02` | Roll-top dry daypack / 防水卷口包 | Skysoar 工厂页: <https://www.skysoars.com/product/waterproof-backpack-custom-dry-bag/> | Alibaba showroom: <https://www.alibaba.com/showroom/waterproof-roll-top-backpack.html>；另一条 low-MOQ listing: <https://www.alibaba.com/product-detail/Waterproof-Dry-Bag-Custom-Pvc-Roll_1601273120896.html> | 公开候选显示 20L-39L/36-56L 两类；常见材质为 PVC / tarpaulin；公开 MOQ 从 50 到 500+；公开价位约 USD 9.23-14.49，Skysoar 页已知 MOQ 300 | 样品价按 USD 12-18 估；国内运费估 USD 1-2；样品包规估 `45 x 25 x 8 cm / 0.8-1.5 kg` | 图片授权未见；定制 logo/颜色常见可做；售后、补发、退换未公开，需 RFQ；未样品前不写 waterproof guarantee / IP 等级 | 候选有 laptop/urban bag 与 dry bag 混类；页面经常把 `waterproof` 写得过满；必须降为 `dry carry / water-resistant carry` | `OG-PB-02-S1 20L matte-black PVC roll-top backpack` | `可进 public preview`，但只用中性防泼溅/干湿分隔口径，自有图优先 |
| `OG-LS-02` | Rechargeable ambient camp lantern / 充电营地灯 | HUIJI listing: <https://www.alibaba.com/product-detail/Portable-Rechargeable-LED-Camping-Lantern-IP44_1601221841747.html> | 1688 mirror 候选: <https://1688.ru/product/681785042247>；低 MOQ 复古灯 listing: <https://www.alibaba.com/product-detail/LED-Camping-Lantern-600-Lumens-Rechargeable_10000032205607.html> | HUIJI 公开可见 `MOQ 2`、`USD 4.99-6.56`、`Type-C`、`1x18650 1500mAh`、`ABS+PS`、`lead time 10 days`；另一条 listing 公开 `MOQ 1`、`4.3 x 4.3 x 11.6 cm`、`0.12-0.20 kg`、`IPX5` | 样品价按 USD 5-12 估；国内运费估 USD 1；优先要求供应商寄 `Type-C 1500-2400mAh` 版本；包规先按 `12 x 8 x 8 cm / 0.25-0.40 kg` | 未见 `MSDS / UN38.3 / 电芯声明`；图片授权未见；售后边界未公开；充电口、电池容量、工作时长需 RFQ 回填 | 同类页里 `IP44/IPX5/IP65`、重量和亮度口径不一致；涉电池，无文件前只能 `coming soon` | `OG-LS-02-S1 Type-C lantern 1500-2400mAh neutral-warm version` | `coming soon only`，先补电池与运输文件，再考虑 preview |
| `OG-CF-01` | Aluminum folding camp table / 铝合金折叠桌 | 1688 offer: <https://detail.1688.com/offer/672613906521.html>；YOHO 零售参考: <https://www.yohohongkong.com/zh-cn/product/151957-%E9%9C%B2%E8%90%A5%E6%8A%98%E5%8F%A0%E6%A1%8C%E6%A4%85-%E7%BB%BF%E8%89%B2%E4%BE%BF%E6%90%BA%E6%A1%8C-%E5%8F%AF%E5%8D%87%E9%99%8D-%E9%80%81%E6%94%B6%E7%BA%B3%E8%A2%8B> | Alibaba showroom: <https://www.alibaba.com/showroom/folding-aluminum-camping-table.html>；同类页: <https://www.alibaba.com/showroom/camping-aluminum-table.html> | 公开线索有 `53.5 x 37 cm`、铝合金、带收纳袋；Alibaba 公开价常见 USD 4.99-20.73；MOQ 多为 100-500，也有少量低 MOQ 样品位 | 样品价按 USD 10-18 估；国内运费估 USD 3-5；样品包规估 `60 x 18 x 12 cm / 2.5-3.8 kg` | 图片授权未见；售后、承重和 replacement 未公开；可做无品牌/定制袋概率高，但需 RFQ；承重和展开稳定性必须靠样品验证 | `load-bearing` 口径风险高；桌脚稳定性、锁扣、涂层耐磨公开页都不足 | `OG-CF-01-S1 53.5x37cm aluminum fold table with carry bag` | `先索样再决定 preview`，通过样品后可用中性 copy 进入 preview |
| `OG-CF-02` | Lightweight folding camp chair / 折叠露营椅 | Tuxiang listing: <https://www.alibaba.com/product-detail/Camping-Chair-Manufacturers-Camping-Chair-Foldable_1601177777772.html> | WOQI 候选: <https://www.alibaba.com/product-introduction/Woqi-wholesale-factory-outdoor-folding-chair_1600433659278.html>；showroom: <https://www.alibaba.com/showroom/600d-oxford-material-camping-chair.html> | 公开候选可见 `600D Oxford`、铝/铁框架两类；Tuxiang 页公开 `51 x 58 x 78 cm`、`MOQ 1`、`160kg` 承重口径；WOQI 候选公开价约 USD 9.80-10.40 / MOQ 500 | 样品价按 USD 8-15 估；国内运费估 USD 3-4；样品包规估 `80 x 18 x 18 cm / 2.0-3.5 kg` | 图片授权未见；承重、缝线、五金件、脚垫需样品核验；售后与补发规则未公开 | 承重 claim 极易过度；铝框和铁框成本差异大；同类 listing 混 beach/fishing/lounge，多数不适合直接当统一 SKU | `OG-CF-02-S1 low-back 600D oxford chair, neutral khaki` | `先索样再决定 preview`，不建议先写 load-bearing 或 heavy-duty |
| `OG-CK-03` | Hanging camp kitchen organizer / 挂式营地厨房收纳包 | 历史 source-backed `OG-CA-R1`: Yangzhou Dandelion Outdoor Equipment Co., Ltd.，来源见 <https://www.alibaba.com/showroom/camping-kitchen-organizer-bag.html> 与历史证据 `HTH-84` | 1688 搜索池: <https://s.1688.com/selloffer/offer_search.htm?keywords=%E9%9C%B2%E8%90%A5%E5%8E%A8%E6%88%BF%E6%94%B6%E7%BA%B3%E6%8C%82%E8%A2%8B>；Alibaba showroom: <https://www.alibaba.com/showroom/camping-kitchen-organizer-bag.html> | 历史 A 已有公开价 `USD 8.50 / 8.30 / 7.80`，`MOQ 500`，`delivery 15-20 days`，`Sample Available`；showroom 中同类 roll bag/cutlery pouch 公开价约 USD 3-5，MOQ 2-50 | 样品价按 USD 5-10 估；国内运费估 USD 1-2；包规估 `38 x 28 x 6 cm / 0.6-0.9 kg` | 图片复用授权仍未拿到；售后边界和补发未见书面；不能写 food-safe / heat-resistant；可询无品牌、吊牌、外袋印刷 | 如果选 tableware/cutlery 风格过重，容易把非食品接触收纳写成食品安全器具 | `OG-CK-03-S1 olive hanging organizer, 6-8 pockets` | `可进 public preview`，继续沿用中性收纳口径 |
| `OG-TR-01` | Small utility pouch / 小号工具收纳包 | 历史 source-backed `OG-TR-R1`: Dongguan Runhong Sports Products Co., Ltd.，历史证据见 `HTH-84` | 1688 搜索池: <https://s.1688.com/selloffer/offer_search.htm?keywords=%E6%88%B7%E5%A4%96%E5%B7%A5%E5%85%B7%E6%94%B6%E7%BA%B3%E5%8C%85>；Alibaba showroom: <https://www.alibaba.com/showroom/utility-pouch-bag.html> | 历史 A 已有公开价 `USD 1.00`、`MOQ 300`、`FREE stock samples`、rush `24-96h`；showroom 同类 small organizer / utility pouch 常见 USD 2.10-2.47、MOQ 100-500 | 样品价按 USD 1-3 估；国内运费估 USD 0.5-1；包规估 `24 x 15 x 4 cm / 0.15-0.30 kg` | 图片授权未见；尺码、颜色、拉链和织带还需冻结；售后只有模糊 `refund/remake` 口径 | tactical / EDC / first-aid 混词太多，必须收敛到 neutral utility pouch | `OG-TR-01-S1 black zip utility pouch 22-24cm` | `可进 public preview`，但先固定单一尺寸和命名 |
| `OG-PB-03` | Packing cube trio / 三件套旅行收纳袋 | Alibaba listing: <https://www.alibaba.com/product-detail/Compression-Travel-Packing-Cubes-Custom-Multi_1601362353129.html> | Showroom 候选: <https://www.alibaba.com/showroom/customized-packing-cubes.html>；supplier hub: <https://www.alibaba.com/supplier/travel-packing-cubes-set.html> | 公开 A 可见 `6-piece set`、`polyester`、`zipper`、`MOQ 500 sets`、常规尺寸可定制；showroom 中 6-7 件套公开价约 USD 2.10-4.42，MOQ 2-100 | 样品价按三件套 USD 3-5 估；国内运费估 USD 1；包规估 `32 x 23 x 5 cm / 0.30-0.45 kg` | 图片授权未见；售后和 replacement 未公开；可定制颜色、logo、包装概率高 | 公开页多为 6-8 件套，需压缩成三件套展示版；不要写 waterproof / odor-proof | `OG-PB-03-S1 3pc cube set black/olive/grey` | `可进 public preview`，先用三件套口径，不跟 supplier 原套数强绑定 |
| `OG-TS-04` | Aluminum stake & reflective guyline kit / 铝地钉反光风绳套装 | 1688 搜索池: <https://s.1688.com/selloffer/offer_search.htm?keywords=%E9%93%9D%E5%90%88%E9%87%91%E5%9C%B0%E9%92%89%E9%A3%8E%E7%BB%B3%E5%A5%97%E8%A3%85> | 拆 BOM 候选：地钉 <https://www.alibaba.com/showroom/pegs.html>；反光风绳 <https://www.alibaba.com/showroom/guy-rope.html> | 单一 kit 公共页不足，但两个部件公开线索充分：7-inch 7000 系铝钉常见 USD 0.22-0.23 / MOQ 100；4mm 反光风绳常见 USD 0.28-0.36 / MOQ 5-100；组合后可做 8 钉 + 4 绳 + 收纳袋 | 样品价按整套 USD 3-5 估；国内运费估 USD 1；包规估 `25 x 12 x 5 cm / 0.40-0.70 kg` | 图片授权未见；夜间可视只可写 `reflective`，不能写 safety；售后/补发未公开 | 如果直接卖散件，SKU 感弱；如果选钢钉，重量会明显上升 | `OG-TS-04-S1 8 stakes + 4 guylines + pouch` | `可进 public preview`，但建议先按 accessory kit 合并口径 |
| `OG-TS-03` | Compact groundsheet footprint / 轻量地布 | Alibaba groundsheet candidate: <https://www.alibaba.com/product-detail/Waterproof-Oxford-Tent-Ground-Sheet-Extra_62343460805.html> | Showroom: <https://www.alibaba.com/showroom/groundsheet-camping.html>；<https://www.alibaba.com/showroom/footprint-groundsheet.html> | 公开候选显示 210D Oxford / PU coating / footprint 口径；showroom 同类公开价约 USD 1.56-8.45；MOQ 50-1000 常见；部分页提 carry bag 和 eyelets | 样品价按 USD 4-7 估；国内运费估 USD 1；包规估 `32 x 24 x 8 cm / 0.45-0.90 kg` | 图片授权未见；防水与涂层口径需 RFQ；售后未公开；可优先选 1-2 个中性尺寸 | groundsheet / tarp / mat 混类明显；不要先写 waterproof rating 或 abrasion-proof | `OG-TS-03-S1 210D Oxford footprint 145x210cm olive` | `可进 public preview`，但先锁定 1 个尺寸和 1 个中性色 |
| `OG-SS-02` | Inflatable sleeping pad / 充气睡垫 | Lancamp listing: <https://www.alibaba.com/product-detail/Outdoor-Camping-Automatic-Inflatable-Mattress-Self_1600653973991.html> | Showroom 候选: <https://www.alibaba.com/showroom/inflatable-sleeping-pad.html>；Ningbo Chanceca supplier hub: <https://www.alibaba.com/supplier/sleeping-pad-inflatable.html> | Lancamp 公开可见 `30D TPU laminated`、`MOQ 50`、`sample USD 29.50`、`sample time 7-10 days`、`delivery 30-45 days`、`200 x 73 x 10 cm`、`pack size 75 x Φ20 cm`、`weight 2.9 kg`；showroom 同类轻量款公开价约 USD 6.66-16 | 样品价先按 USD 15-30 估；国内运费估 USD 2-4；优先做单人厚垫，包规如公开 `75 x 20 cm / 2.9 kg` 或更轻款 `30 x 12 x 12 cm / 0.8-1.2 kg` | 图片授权未见；漏气、阀门和实际重量必须验样；售后未公开；可定制 logo/包装常见 | 同类里有 ultralight 款和豪华厚垫两极分化；R-value、厚度、重量非常容易漂移 | `OG-SS-02-S1 single pad 30D/75D TPU, 200x70+ cm` | `先索样再决定 preview`，不通过 48h 漏气测试不要公开主推 |
| `OG-SS-03` | Compressible camp pillow / 露营枕 | Wenzhou Sansu listing: <https://www.alibaba.com/product-detail/Ultralight-Inflatable-Camping-Travel-Pillow-Compressible_1600867334345.html> | Ningbo Yinzhou listing: <https://www.alibaba.com/product-detail/Camping-Compressible-Portable-Waterproof-TPU-Air_1600722643741.html> | A 公开可见 `49 x 33 cm`、`TPU fabric`、`MOQ 100`、`lead 7/12/20 days`、`单包 15 x 15 x 5 cm / 0.14 kg`、价格约 GBP 1.82-2.22；B 公开可见 `45 x 28 x 9 cm`、`MOQ 500`、`Sample available`、`sample time 5-7 days` | 样品价按 USD 2.5-4 估；国内运费估 USD 0.5-1；包规优先沿用 A 的 `15 x 15 x 5 cm / 0.14-0.25 kg` | 图片授权未见；B 页 gross weight 异常高，不能直接信；不能写 orthopedic / anti-snore / antibacterial 等强 claim | pillow 页常塞过量功能词；必须只保留 portable / lightweight / compact | `OG-SS-03-S1 inflatable pillow 45-49cm dark green` | `可进 public preview`，但 copy 要非常克制 |
| `OG-CK-01` | Nesting camp cook pot set / 嵌套锅具套装 | Alibaba cookware showroom: <https://www.alibaba.com/showroom/camping-cookware-wholesale.html> | 同类候选：<https://www.alibaba.com/showroom/aluminum-camping-pot-set.html>；<https://www.alibaba.com/wholesale/portable-cookware-set.html> | 公开同类价带约 USD 5.00-10.28；常见 MOQ 2-200；常见结构是 `2-3 人套锅 + kettle/pan`，多为 aluminum alloy / anodized aluminum / stainless steel 混类 | 样品价按 USD 8-15 估；国内运费估 USD 2；样品包规估 `20 x 20 x 12 cm / 0.8-1.4 kg` | 食品接触、材质、涂层、洗护、售后都没有统一公开证据；图片授权未见；必须补材质证明 | food-contact 风险最高；`non-stick`、`food-grade`、`BPA-free` 等词没有文件前都不能用 | `OG-CK-01-S1 2-person anodized aluminum nesting pot set` | `coming soon only`，先拿材质/涂层文件和样品 |

## 4. 推荐样品清单

建议首轮不要 12 款全部各拿 2 件，而是按风险分层：

1. 高风险先拿 1 件：
   - `OG-LS-02-S1`
   - `OG-SS-02-S1`
   - `OG-CF-01-S1`
   - `OG-CK-01-S1`
2. 中风险拿 1 件：
   - `OG-CF-02-S1`
   - `OG-PB-02-S1`
   - `OG-CK-03-S1`
3. 低风险可与中风险拼单或延后：
   - `OG-TR-01-S1`
   - `OG-PB-03-S1`
   - `OG-TS-04-S1`
   - `OG-TS-03-S1`
   - `OG-SS-03-S1`

按这个顺序，第一轮样品商品成本估算约：

- 高风险四款：`USD 38-70`
- 中风险三款：`USD 23-43`
- 低风险五款：`USD 14-24`
- 合计样品货值估算：`USD 75-137`
- 若加国内运费和异常补单 buffer，建议内部预留：`USD 95-165`

## 5. 必补 RFQ 字段

这些字段在公开页普遍缺失，是下一步必须统一追的：

- 是否允许 storefront / PDP 复用 supplier 图；若不允许，能否只给 detail close-up 作内部参考
- 样品价、样品国内运费、是否支持 1 件样品单
- 批量价断点、是否支持无品牌、吊牌/洗标/包装袋定制
- 单箱装箱数、外箱尺寸、单个样品净重/毛重
- replacement / refund / remake / reship 边界
- 对涉电池商品：电池容量、充电口规格、MSDS、UN38.3、运输限制
- 对食品接触商品：材质、涂层、可出示文件、可对外展示的合规措辞

## 6. 给运营总监的最小决策口径

- 可以先把 `OG-CK-03`、`OG-TR-01`、`OG-PB-03` 视为最低风险 preview 候选。
- `OG-PB-02`、`OG-TS-03`、`OG-TS-04`、`OG-SS-03` 可以先做 public preview，但前提是只用自有图/生成图，文案不用性能型 claim。
- `OG-CF-01`、`OG-CF-02`、`OG-SS-02` 需要样品验证后再决定是否升 preview 主推。
- `OG-LS-02` 与 `OG-CK-01` 都不建议直接升 public preview 主推：前者卡电池运输/认证文件，后者卡食品接触与材质文件。

## 7. 与历史任务的衔接

- `OG-CK-03` 继承 `OG-CA-R1` 的历史 source-backed 结论，但图片授权和样品验货仍未闭环。
- `OG-TR-01` 继承 `OG-TR-R1` 的历史 source-backed 结论，但最终展示规格仍需冻结。
- 本文件完成的是 `P0 12 款样品与供应链复核` 的决策底稿，不代表任何 SKU 已进入 live pilot。
