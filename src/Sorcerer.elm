module Sorcerer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ソーサラー 1.121"],
     text "ソーサラーはフルリスペックされる。",
     sec "Matter Magic (基本)",
     text "新しいDDスペルを追加",
     ulist ["Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power",
            "Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range -6 power",
            "Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power",
            "Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power",
            "Level 45 - Magma Crush - 2.6s - 179 matter damage - 1500 range - 30 power"],
     sec "Mind Magic (スペック)",
     ulist ["Mez Dampening 自己 buff は除去される。",
            "Added group-wide power regen buffs of versions that did not have them."]]
 


