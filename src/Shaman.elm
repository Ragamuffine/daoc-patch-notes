module Shaman exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "シャーマン 1.121"],
     text "シャーマンはフルリスペックされる。",
     br [] [],
     text "シャーマンの RR5 Restorative Mend は次のように変更される。",
     text "ティックごとの Health, End, Power の回復は 5% から 15% になる。持続時間は45秒から20秒になる。ティックは3秒ごとではなく2秒ごとになる。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Augmentation (スペック)",
     text "新しい single target comprehension buff が追加される。この buff は acuity buff とスタックする。",
     ulist ["Level 23 - Tribal Clarity - 2.5s cast - 1500 range - 再使用60秒 - 20秒間継続 - 25% power - piety 30 増加",
            "Level 43 - Ancestral Clarity - 2.5s cast - 1500 range - 再使用60秒 - 20秒間継続 - 25% power - piety 62 増加"],
     text "新しい single target melee damage increase buff が追加される。",
     ulist ["Level 30 - Earthen Power - 3.2s cast - 1500 range - 再使用30秒 - 10秒間継続 - 20% power - 物理ダメージを15%増加"],
     text "新しい single target melee damage 反射 buff が追加される",
     ulist ["Level 36 - Caustic Carapace - 3.0s cast - 1500 range - 再使用60秒 - 15秒間継続 - 20% power - 物理ダメージを150%反射する"],
     text "Spirit Shell はフォーカスではなくバフになる。ターゲットは戦闘可能。詠唱 2.5 秒, 持続時間 10 秒, 再使用60秒, 25% power.",
     text "新しいヒール増強バフが追加される。",
     ulist ["Level 24 - Frigg's Grace - 2s cast - 1500 range - 再使用15秒 - 45秒間継続 - 20% power - ターゲットへのヒールを55%増加させる",
            "Level 35 - Frigg's Superior Grace - 2s cast - 1500 range - 再使用15秒 - 45秒間継続 - 20% power - ターゲットへのヒールを100%増加させる。"],
     text "新しい heal over time が追加される。",
     ulist ["Level 8 - Regenerative Stupor - Instant cast - 1500 range - 持続時間10秒 - 5% power - 毎秒12 HP回復 - 再使用30秒",
            "Level 18 - Regenerative Dream - Instant cast - 1500 range - 持続時間10秒 - 10% power - 毎秒25 HP回復 - 再使用30秒",
            "Level 28 - Regenerative Muse - Instant cast - 1500 range - 持続時間10秒 - 20% power - 毎秒50 HP回復 - 再使用30秒",
            "Level 38 - Regenerative Trance - Instant cast - 1500 range - 持続時間10秒 - 30% power - 毎秒100 HP回復 - 再使用30秒",
            "Level 48 - Regenerative Rapture - Instant cast - 1500 range - 持続時間10秒 - 40% power - 毎秒150 HP回復 - 再使用30秒"],
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff とスタックしない。",
     ulist ["Level 13 - Cavern Unity - Increases Heat/Matter/Cold resist 12%増加",
            "Level 30 - Tribal Unity - Increases Heat/Matter/Cold resist 18%増加",
            "Level 40 - Shaman Unity - Increases Heat/Matter/Cold resist 24%増加"],
     secmid "Cave Magic (基本)",
     text "disease と AOE disease は最上位のレベルのみ有効になる。",
     secmid "Cave Magic (スペック)",
     text "ダメージシールドは Cave Magic に移動する。concentration buff ではなく持続時間10分になる。",
     text "matter DD スペルは調整される。",
     ulist ["Level 1 - Fungal Mud - 5 ダメージから 17 ダメージに増加",
            "Level 11 - Fungal Slush - 41 ダメージから 57 ダメージに増加",
            "Level 21 - Fungal Ooze -  73 ダメージから 92 ダメージに増加",
            "Level 31 - Fungal Ichor - 108 ダメージから 128 ダメージに増加",
            "Level 41 - Fungal Mucus - 148 ダメージから 179 ダメージに増加"],
     text "ボルトスペルは調整される。",
     ulist ["Level 1 - Fungal Pin - 8 ダメージから 26 ダメージに増加",
            "Level 11 - Fungal Bramble - 64 ダメージから 103 ダメージに増加",
            "Level 21 - Fungal Thorn - 145 ダメージから 170 ダメージに増加",
            "Level 31 - Fungal Barb - 169 ダメージから 211 ダメージに増加",
            "Level 41 - Fungal Spine - 232 ダメージから 265 ダメージに増加"],
     text "新しく root 除去スペルが追加される。",
     ulist ["Level 16 - Escape Hold - 3s cast - 1500 range - 再使用5分 - 10% power - すべての root/snare を除去する。自分には使用できない。"],
     text "新しい single target root が追加される。",
     ulist ["Level 28 - Rotting Clench - Instant cast - 1500 range - 5min 再使用 - 46秒間継続"],
     text "新しい AoE root が追加される。",
     ulist ["Level 38 - Rotting Undergrowth - Instant cast - 1500 range - 350 半径 - 10min 再使用 - 56秒間継続"],
     text "新しい物理ダメージ吸収バフが追加される。",
     ulist ["Level 21 - Crumble Arms - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 10% power - ターゲットへの物理ダメージを20%吸収.",
            "Level 41 - Deteriorate Arms - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 20% power - ターゲットへの物理ダメージを40%吸収."],
     text "新しい魔法ダメージ吸収バフが追加される。",
     ulist ["Level 24 - Suppress Magic - 2.8 sec cast - 1000 range - 持続時間30秒 - 再使用45秒 - 15% power - ターゲットへの魔法ダメージを25%吸収.",
            "Level 44 - Halt Magic - 2.8 sec cast - 1000 range - 持続時間30秒 - 30% power - 再使用45秒 - ターゲットへの魔法ダメージを50%吸収."],
     text "新しい PBAoE endurance デバフスペルが追加される。",
     ulist ["Level 30 - Exhaustive Blast - Instant - 半径750 - 再使用15秒 - 102 power - ターゲットの endurance を 35 低下させる"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "シャーマン 1.121B"],
     text "シャーマンはフルリスペックされる。",
     br [] [],
     text "Level 28 single target acuity shear Acuity Cut は Augmentation スペックに戻される。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
