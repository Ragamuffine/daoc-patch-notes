module Shaman exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "シャーマン 1.121"],
     text "シャーマンはフルリスペックされる。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Augmentation (スペック)",
     text "新しい single target comprehension buff が追加される。この buff は acuity buff とスタックする。",
     ulist ["Level 23 - Tribal Clarity - 2.5s cast - 1500 range - 再使用60秒 - 10秒間継続 - 25% power - piety 30 増加",
            "Level 43 - Ancestral Clarity - 2.5s cast - 1500 range - 再使用60秒 - 10秒間継続 - 25% power - piety 65 増加"],
     text "新しい single target melee damage increase buff が追加される。",
     ulist ["Level 30 - Earthen Power - 3.2s cast - 1000 range - 再使用30秒 - 10秒間継続 - 20% power - 物理ダメージを10%増加"],
     text "新しい single target melee damage reflection buff が追加される",
     ulist ["Level 36 - Caustic Carapace - 3.0s cast - 1500 range - 再使用60秒 - 15秒間継続 - 20% power - 物理ダメージを200%反射する"],
     text "Spirit Shell はフォーカスではなくバフになる。ターゲットは戦闘可能。",
     ulist ["Level 41 - Spirit Shell - 2.5s cast - 1500 range - 再使用60秒 - 10秒間継続 - 25% power - すべてのダメージを50%吸収する。"],
     text "新しいヒール増強バフが追加される。",
     ulist ["Level 24 - Frigg's Grace - 2s cast - 1500 range - 再使用30秒 - 10秒間継続 - 20% power - ターゲットへのヒールを55%増加させる",
            "Level 35 - Frigg's Superior Grace - 2s cast - 1500 range - 再使用30秒 - 10秒間継続 - 20% power - ターゲットへのヒールを100%増加させる。"],
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。",
     ulist ["Level 13 - Cavern Unity - Increases Heat/Matter/Cold resist 12%増加",
            "Level 30 - Tribal Unity - Increases Heat/Matter/Cold resist 18%増加",
            "Level 40 - Shaman Unity - Increases Heat/Matter/Cold resist 24%増加"],
     secmid "Cave Magic (スペック)",
     text "新しく root 除去スペルが追加される。",
     ulist ["Level 16 - Escape Hold - 3s cast - 1500 range - 再使用5分 - 10% power - すべての root/snare を除去する。自分には使用できない。"],
     text "新しい single target root が追加される。",
     ulist ["Level 28 - Rotting Clench - Instant cast - 1500 range - 5min 再使用 - 46秒間継続"],
     text "新しい AoE root が追加される。",
     ulist ["Level 38 - Rotting Undergrowth - Instant cast - 1500 range - 350 半径 - 10min 再使用 - 56秒間継続"]]
