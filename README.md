# 営業日計算機（iGenTrade / 合同会社威源国際貿易）

開始日からN営業日後の日付、または開始日と終了日の間の営業日数を計算する静的Webツールです。土日と日本の祝日の除外を個別に切り替えられます。

**提供元:** 合同会社威源国際貿易（iGenTrade）  
**公式サイト:** https://www.igentrade.com/

## 主な機能

- 開始日 + N営業日 → 終了日
- 開始日 + 終了日 → 営業日数（開始日・終了日を含む）
- 土日を除外 / 含める切り替え
- 2025・2026・2027年の日本の祝日を内蔵（主要な振替休日を含む）
- localStorageの下書き、印刷 / PDF出力（ブランドフッター初期オフ）

祝日データは中小企業の計画用の概算です。公式カレンダー・自治体の休日・会社独自休日と異なる場合があるため、重要な納期では最新の公的情報を確認してください。

## 関連ツール

- [igentrade-seikyu](../igentrade-seikyu/)（見積書・請求書）
- [igentrade-nohin-ryoshu](../igentrade-nohin-ryoshu/)（納品書・領収書）
- [igentrade-shohizei](../igentrade-shohizei/)（消費税計算）
- [igentrade-kawase](../igentrade-kawase/)（為替・概算コスト）

## ライセンス

MIT License — Copyright (c) 2026 合同会社威源国際貿易 (iGenTrade)
