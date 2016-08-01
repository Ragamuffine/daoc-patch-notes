module Healer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーラー 1.121"],
     text "ヒーラーはフルリスペックされる。",
     text "ヒーラーはレルムアビリティーをリスペックされる。",
     text "Quickcast 能力を習得する。",
     text "レルムアビリティーに Concentration が追加される。",
     text "ヒーラーの power regen はスカルドの power regen song を上書きする。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Augmentation (スペック)",
     text "mesmerize reduction self-buff は除去される。",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。",
     ulist ["Level 13 - Gods' Health - Spirit/Energy/Body resist 12%増加",
            "Level 30 - Gods' Vigor - Spirit/Energy/Body resist 18%増加",
            "Level 40 - Gods' Potency - Spirit/Energy/Body resist 24%増加"],
     secmid "Pacification (スペック)",
     text "single target instant heal が追加される。",
     ulist ["Level 33 - Healing Surge - 50 sec 再使用 - Heal 20% - 1000 range - 40% power",
            "Level 43 - Restorative Surge - 50 sec 再使用 - Heal 45% - 1000 range - 40% power"]]
