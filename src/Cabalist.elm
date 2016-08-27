module Cabalist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "カバリスト 1.121"],
     text "カバリストはフルリスペックされる。",
     secalb "Body Destruction (スペック)",
     text "Level 45 lifetap, Abduct Lifeforce, のダメージは 174 から 199 に増加する。",
     secalb "Matter Magic (基本)",
     text "新しい matter DDスペルを追加",
     ulist ["Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power",
            "Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power",
            "Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power",
            "Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power",
            "Level 45 - Magma Crush - 2.6s - 184 matter damage - 1500 range - 30 power"],
     secalb "Matter Manipulation (スペック)",
     text "新しい matter damage PBAoE が追加される。",
     ulist ["Level 8 - Minor Earth Tremble - 52 damage - 300 radius - 5 power",
            "Level 18 - Earth Tremble - 111 damage - 300 radius - 9 power",
            "Level 28 - Major Earth Tremble - 176 damage - 300 radius - 16 power",
            "Level 38 - Upheaval - 260 damage - 300 radius - 23 power",
            "Level 48 - Earthquake - 325 damage - 300 radius - 31 power"],
     text "新しい PBAoE のためにいくつかの呪文が修正される。",
     ulist ["Level 2 - Lesser Decrepify - 削除",
            "Level 3 - Decrepify - level 2 へ移動",
            "Level 4 - Reflect Blow - 削除",
            "Level 6 - Reflect Damage - level 4 へ移動",
            "Level 10 - Lesser Contamination - 削除",
            "Level 13 - Contamination - level 10 へ移動",
            "Level 16 - Lesser Devolution - level 14 へ移動",
            "Level 18 - Punctured Spirit - level 17 へ移動",
            "Level 36 - Drill Spirit - level 34 へ移動",
            "Level 46 - Lance Spirit - level 45 へ移動"],
     text "新しい AoE matter DDスペルを追加",
     ulist ["Level 8 - Earth Shatter - 3.0s - 28 matter damage - 1500 range - 350 半径 - 5 power",
            "Level 17 - Earth Break - 3.0s - 72 matter damage - 1500 range - 350 半径 - 12 power",
            "Level 28 - Earth Crush - 3.0s - 95 matter damage - 1500 range - 350 半径 - 16 power",
            "Level 37 - Stone Break - 3.0s - 123 matter damage - 1500 range - 350 半径 - 21 power",
            "Level 47 - Stone Shatter - 3.0s - 158 matter damage - 1500 range - 350 半径 - 28 power"],
     secalb "Essence Manipulation (スペック)",
     text "新しい instant Energy resistance debuff を追加",
     ulist ["Level 22 - Energy Wither - 15% energy debuff - 1500 range - 10 power",
            "Level 34 - Energy Siphon - 30% energy debuff -1500 range - 16 power",
            "Level 46 - Energy Void - 50% energy debuff - 1500 range - 24 power"],
     text "以下のスペルを移動",
     ulist ["Level 22 disease spell を level 20 に移動",
            "Level 34 disease spell を level 30 に移動",
            "Level 46 life transfer spell を level 41 に移動"],
     secalb "Spirit Animation (スペック)",
     text "ペット cure mesmerization cure を level 16 に追加"]


all : List (Html Message)
all = patch_1_121
