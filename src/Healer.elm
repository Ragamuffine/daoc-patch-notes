module Healer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーラー 1.121"],
     text "ヒーラーはフルリスペックされる。",
     text "ヒーラーはレルムアビリティーをリスペックされる。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Augmentation (スペック)",
     text "mesmerize reduction self-buff は除去される。",
     br [] [],
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff とスタックしない。",
     ulist ["Level 13 - Gods' Health - Spirit/Energy/Body resist 12%増加",
            "Level 30 - Gods' Vigor - Spirit/Energy/Body resist 18%増加",
            "Level 40 - Gods' Potency - Spirit/Energy/Body resist 24%増加"],
     secmid "Pacification (スペック)",
     text "single target instant heal が追加される。",
     ulist ["Level 33 - Healing Surge - 50 sec 再使用 - Heal 20% - 1000 range - 40% power",
            "Level 43 - Restorative Surge - 50 sec 再使用 - Heal 45% - 1000 range - 40% power"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ヒーラー 1.122B"],
     secmid "Augmentation (基本)",
     ulist ["Level 42 - Guardian's Lesser Protection - AFの上昇値を 52 から 150 に増加"],
     secmid "Pacification (基本)",
     text "グループスピード呪文の効果はスカルドと同じレベルまで強化される。",
     ulist ["Level 6 - Ease of Movement - 126% から 144% に",
            "Level 15 - Flow of Movement - 133% から 156% に",
            "Level 25 - Grace of Movement - 141% から 174% に",
            "Level 35 - Purity of Movement - 148% から 189% に",
            "Level 45 - Elegance of Movement - 176% から 204% に"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
