module Bainshee exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "バンシー 1.121"],
     text "バンシーはフルリスペックされる。",
     sechib "Spectral Guard (基本)",
     text "single target root は Spectral Force に移される。",
     sechib "Spectral Force (スペック)",
     text "group pulse magic ablative chant は以下のように変更になる。",
     br [] [],
     text "single target 100% magic ablative. 2.8 sec cast, 再使用60秒, 30秒継続. 自分には詠唱できない。",
     ulist ["Audible Barrier, Level 20, 300 magic damage 吸収, Level 30 から 20 に変更",
            "Tumultuous Barrier, Level 30, 375 magic damage 吸収, Level 40 から 30 に変更",
            "Resounding Barrier, level 40, 500 magic damage 吸収, Level 50 から 40 に変更"],
     text "single target root がレベル 6, 12, 21, 28, 35, 43, 49 に追加される。",
     sechib "Phantasmal Wail (スペック)",
     text "single target Dex-Qui debuff / body DDスペルは AoE body DD / 10% body debuff スペルに変更になる。",
     ulist ["Level 3 - 3 body damage, 350 半径",
            "Level 7 - 25 body damage, 350 半径",
            "Level 13 - 44 body damage, 350 半径",
            "Level 19 - 64 body damage, 350 半径",
            "Level 27 - 89 body damage, 350 半径",
            "Level 35 - 110 body damage, 350 半径",
            "Level 43 - 120 body damage, 350 半径",
            "Level 48 - 141 body damage, 350 半径"],
     text "single target shear が追加される。",
     ulist ["Level 33 - Strength shear",
            "Level 34 - Constitution shear",
            "Level 36 - Dexterity shear",
            "Level 37 - Acuity shear",
            "Level 38 - Str/Con shear",
            "Level 39 - Dex/Qui shear"],
     text "新しい single target random shear が追加される。",
     ulist ["Level 50 - 再使用2分, 1500 range, 4s キャスト時間"],
     sechib "Ethereal Shriek (スペック)",
     text "新しい single target cold DD が追加される。",
     ulist ["Level 7 - Frosty Torment - 2.8s cast - 1500 range - 4 power - 34 cold damage",
            "Level 17 - Bleak Torment - 2.8s cast - 1500 range - 9 power - 68 cold damage",
            "Level 27 - Chilled Torment - 2.8s cast - 1500 range - 17 power - 122 cold damage",
            "Level 37 - Icy Torment - 2.8s cast - 1500 range - 22 power - 153 cold damage",
            "Level 47 - Frigid Torment - 2.8s cast - 1500 range - 29 power - 199 cold damage"],
     text "AoE DD と AoE bolt の属性は body から cold に変更される。",
     br [] [],
     text "新しい AoE のペットを追い払うスペルが追加される。",
     ulist ["Level 50 - 1250 半径 - 20秒間継続 - 5s cast time - 再使用5分"],
     text "新しい single target mesmerization cure が追加される。",
     ulist ["Level 26 - Alarming Screech - 3s cast time - 1500 range - 6% power cost"]]
