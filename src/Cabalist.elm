module Cabalist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "カバリスト 1.121"],
     text "カバリストはフルリスペックされる。",
     sec "Matter Magic (基本)",
     text "新しい matter DDスペルを追加",
     ulist ["Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power",
            "Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power",
            "Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power",
            "Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power",
            "Level 45 - Magma Crush - 2.6s - 179 matter damage - 1500 range - 30 power"],
     sec "Matter Manipulation (スペック)",
     text "新しい AoE matter DDスペルを追加",
     ulist ["Level 8 - Earth Shatter - 3.0s - 28 matter damage - 1500 range - 350 radius - 5 power",
            "Level 17 - Earth Break - 3.0s - 72 matter damage - 1500 range - 350 radius - 12 power",
            "Level 28 - Earth Crush - 3.0s - 95 matter damage - 1500 range - 350 radius - 16 power",
            "Level 37 - Stone Break - 3.0s - 123 matter damage - 1500 range - 350 radius - 21 power",
            "Level 47 - Stone Shatter - 3.0s - 158 matter damage - 1500 range - 350 radius - 28 power"],
     sec "Essence Manipulation (スペック)",
     text "新しい instant Energy resistance debuff を追加",
     ulist ["Level 22 - Energy Wither - 15% energy debuff - 1500 range - 10 power",
            "Level 34 - Energy Siphon - 30% energy debuff -1500 range - 16 power",
            "Level 46 - Energy Void - 50% energy debuff - 1500 range - 24 power"],
     text "以下のスペルを移動",
     ulist ["Level 22 disease spell を level 20 に移動",
            "Level 34 disease spell を level 30 に移動",
            "Level 46 life transfer spell を level 41 に移動"],
     sec "Spirit Animation (スペック)",
     text "ペット cure mesmerization cure を level 16 に追加"]
