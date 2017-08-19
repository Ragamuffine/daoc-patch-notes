module Druid exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ドルイド 1.121"],
     text "ドルイドはフルリスペックされる。",
     text "ペットが行う自己バフはプレイヤーが上書きできない。ペットの自己バフは25% buff effectiveness ボーナスで効果を計算される。",
     sechib "Regrowth (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     sechib "Nurture (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff およびバードの resist buff とスタックしない。",
     ulist ["Level 13 - Warmth of the Badger - Increases Heat/Matter/Cold resist 12%増加",
            "Level 30 - Warmth of the Wolf - Increases Heat/Matter/Cold resist 18%増加",
            "Level 40 - Warmth of the Bear - Increases Heat/Matter/Cold resist 24%増加"],
     text "Nature's Cocoon (single-target focus damage shell) は次のように変更される。",
     ulist ["ダメージ吸収を 90% から 50% に変更",
            "focus ではなく target は戦闘が可能",
            "5s cast, 10秒間継続, 再使用60秒, 25% power cost",
            "level 47 から 45 に変更"],
     sechib "Nature (基本)",
     text "従来の召喚ペットはベースに移動される。最大レベルは 40 である。",
     sechib "Nature (スペック)",
     text "AoE damage shield buff は削除される。",
     br [] [],
     text "single target グラップルが追加される。",
     ulist ["Level 14 - Forest's Pull - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 5秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン",
            "Level 35 - Forest's Reach - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 8秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン"],
     text "新しい召喚ペットが追加される。",
     ulist ["Level 42, Call Nature Sage. ペットレベル50. melee haste buff と str/con buff を自分にかける。"],
     text "新しい呪文が追加される。",
     ulist ["Level 2 - Nature's Frenzy - Instant cast - ペット対象 50% celerity buff, 25% damage done buff, -25% absorption debuff. 持続時間30秒, 再使用60秒",
            "ペットコマンド“Frenzy”は削除される。"],
     text "AoE Instant heal が追加される。",
     ulist ["Level 15 - 再使用60秒 - Heal 15%, 1500 range, 250 半径.",
            "Level 45 - 再使用60秒 - Heal 45%, 1500 range, 250 半径."],
     text "root 除去スペル Free Wind を追加",
     ulist ["level 13, 再使用5分, 3.0 sec cast, 1500 range, 10% power.",
            "自分に対しては使用できない。"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ドルイド 1.122B"],
     sechib "Nurture (基本)",
     text "Level 45 - Superior Skin of the Redwood - AF の値は 55 から 150 に増加する。",
     text "Cloak of the Loyal Druid の pbaoe root /use ability は敵ターゲットに対して正しく発動するようになる。",
     text "Cloak of the Loyal Druid の Aura of the Grove は正しく10分間継続するようになる。"]


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h2 [] [text "ドルイド 1.122B Hot Fix"],
     text "Cloak of the Loyal Druid の cure disease の頻度は30秒毎から15秒毎になる。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ドルイド 1.123"],
     text "ドルイドはフルリスペックされる。",
     sechib "Nature (基本)",
     text "単体攻撃スペルが追加される。",
     ulist ["Level 9 - Violent Winds - 1500 range - 2.6s cast - 7 power - 35 energy damage",
            "Level 19 - Fierce Winds - 1500 range - 2.6s cast - 15 power - 73 energy damage",
            "Level 29 - Forceful Winds - 1500 range - 2.6s cast - 19 power - 92 energy damage",
            "Level 39 - Turbid Winds - 1500 range - 2.6s cast - 30 power - 128 energy damage",
            "Level 49 - Tempest Winds - 1500 range - 2.6s cast - 37 power - 148 energy damage"],
     text "古い Nature (基本)ラインの呪文は新しい単体攻撃スペルを追加するために整理統合されている。",
     sechib "Nature (スペック)",
     text "Nature ラインは全面的に改修された。",
     br [] [],
     text "単体ヒール&amp;HoTスペルが追加された。なお単体HoTとグループHoTはスタックする。",
     ulist ["Level 6 - Regenerating Heal - 1500 range - 3.0s cast - 13 power - 38ヒール, 10秒間で10ヒール",
            "Level 16 - Regenerating Resurgence - 1500 range - 2.9s cast - 21 power - 108ヒール, 10秒間で70ヒール",
            "Level 26 - Regenerating Regrowth - 1500 range - 2.8s cast - 32 power - 185ヒール, 10秒間で130ヒール",
            "Level 36 - Regenerating Renascence - 1500 range - 2.6 cast - 43 power - 241ヒール, 10秒間で190ヒール",
            "Level 46 - Regenerating Apotheosis - 1500 range - 2.5s cast - 55 power - 302ヒール, 10秒間で250ヒール"],
     text "グループヒール&amp;HoTスペルが追加された。なお単体HoTとグループHoTはスタックする。同種のHoTは上書きされない。",
     ulist ["Level 9 - Healing Breeze - 1500 range - 3.2s cast - 25% power - 20ヒール, 10秒間で4%",
            "Level 19 - Recuperating Breeze - 1500 range - 3s cast - 25% power - 50ヒール, 10秒間で5%",
            "Level 29 - Regenerating Breeze - 1500 range - 2.8s cast - 25% power - 145ヒール, 10秒間で7%",
            "Level 39 - Renewing Breeze - 1500 range - 2.6s cast - 25% power - 160ヒール, 10秒間で10%",
            "Level 49 - Regrowing Breeze - 1500 range - 2.5s cast - 25% power - 205ヒール, 10秒間で15%"],
     text "新しいDoTスペルが追加される。このDoTはベースラインDoTとスタックする。",
     ulist ["Level 2 - Sparkgrass - 1500 range - 2.5s cast - 7 power - 2秒ごとに 10 heat damage",
            "Level 12 - Windburn - 1500 range - 2.5s cast - 14 power - 2秒ごとに 27 heat damage",
            "Level 22 - Emberleaf - 1500 range - 2.5s cast - 20 power - 2秒ごとに 50 heat damage",
            "Level 32 - Wildfire - 1500 range - 2.5s cast - 31 power - 2秒ごとに 80 heat damage",
            "Leve 42 - Flamethorn - 1500 range - 2.5s cast - 44 power - 2秒ごとに 116 heat damage"],
     text "単体スネアスペルは以下のように変更される。",
     ulist ["Level 3 - Grasping Ivy - 1500 range - 2.5s cast - 20秒持続 - 再使用5分 - 20% power - スネア50%",
            "Level 13 - Grasping Tendrils - 1500 range - 2.5s cast - 30秒継続 - 再使用5分 - 20% power - スネア50%",
            "Level 23 - Grasping Creepers - 1500 range - 2.5s cast - 40秒継続 - 再使用1分 - 20% power - スネア50%",
            "Level 33 - Grasping Tangleweed - 1500 range - 2.5s cast - 50秒継続 - 再使用30秒 - 20% power - スネア50%",
            "Level 43 - Grasping Thornweed - 1500 range - 2.5s cast - 60秒継続 - 再使用30秒 - 20% power - スネア50%"],
     text "AoEルートスペルは以下のように変更される。",
     ulist ["Level 4 - Patch of Ivy - 1500 range - 半径350 - 2.5s cast - 12秒継続 - 3 power",
            "Level 14 - Patch of Tangleweed - 1500 range - 半径350 - 2.5s cast - 30秒継続 - 10 power",
            "Level 24 - Patch of Brambles - 1500 range - 半径350 - 2.5s cast - 47秒継続 - 18 power",
            "Level 34 - Patch of Thistles - 1500 range - 半径350 - 2.5s cast - 60秒継続 - 25 power",
            "Level 44 - Patch of Underwood - 1500 range - 半径350 - 2.5s cast - 73秒継続 - 32 power"],
     text "インスタントルートスペルは以下のように変更される。",
     ulist ["Level 20 - Sprouting Thicket - 1500 range - Instant cast - 再使用5分 - 46秒継続 - 17 power",
            "Level 30 - Choking Undergrowth - 1500 range - 半径350 - Instant cast - 再使用10分 - 79秒継続 - 30 power"],
     text "グループメンバーのヘルスと armor factor を増加させる新しいチャントが追加される。",
     ulist ["Level 5 - Stoutness of Oak - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを1%増加させる",
            "Level 15 - Girth of Oak - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを3%増加させる",
            "Level 25 - Resilience of Oak - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを5%増加させる",
            "Level 35 - Vigor of Oak - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを7%増加させる",
            "Level 45 - Vitality of Oak - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを10%増加させる"],
     text "新しい防御 proc が追加される。",
     ulist ["Level 8 - Vine Skin - 1500 range - 2.8s cast - 再使用5分 - 20秒持続 - 10% power - 物理攻撃者を5秒間ルート。このルートは無効時間を持たないが既に無効中であれば適用されない。",
            "Level 18 - Leaf Skin - 1500 range - 2.8s cast - 再使用5分 - 20秒持続 - 10% power - 物理攻撃者を10秒間ルート。このルートは無効時間を持たないが既に無効中であれば適用されない。",
            "Level 28 - Root Skin - 1500 range - 2.8s cast - 3m reuse - 20秒持続 - 10% power - 物理攻撃者を20秒間ルート。このルートは無効時間を持たないが既に無効中であれば適用されない。",
            "Level 38 - Lush Skin - 1500 range - 2.8s cast - 60s reuse - 20秒持続 - 10% power - 物理攻撃者を34秒間ルート。このルートは無効時間を持たないが既に無効中であれば適用されない。",
            "Level 48 - Fertile Skin - 1500 range - 2.8s cast - 60s reuse - 20秒持続 - 10% power - 物理攻撃者を48秒間ルート。このルートは無効時間を持たないが既に無効中であれば適用されない。"],
     text "新しいスペルが追加される。",
     ulist ["Level 50 - Heart of Nature - Instant cast - 再使用10分 - 25% power - グループメンバーのすべてのルートとスネアを除去し、味方の200ユニット以内にいる敵を最大2体15秒間ルート状態にする。このルートは無効時間であっても効力を持ち、ダメージを受けても解除されない。このルートは無効時間を無視するがこのルートが解除された後は無効時間が存在する。"],
     text "Free Wind はレベル17のままである。",
     text "Call Nature Sage はレベル40で習得する。これはレベル40ベースラインペットの `Summon Grove Protector' を置き換える。",
     text "樹木に加えて bear, lynx, wolf の nature sage も追加される。",
     ulist ["Lynx Sage は Dexterity/Quickness buff を持つ。",
            "Wolf Sage は damage add buff を持つ。",
            "Bear Sage は Constitution buff を持つ。",
            "Nature Sage は disease defensive proc を持つ。"],
     text "単体グラップルは削除された。",
     text "単体ダメージ吸収バフは削除された。",
     text "PBAoE ルートは削除された。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix
      ++ patch_1_123
