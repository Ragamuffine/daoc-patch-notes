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
     text "新しくペットを追い払う AoE スペルが追加される。",
     ulist ["Level 50 - 1250 半径 - 20秒間継続 - 5s cast time - 再使用5分"],
     text "新しい single target mesmerization cure が追加される。",
     ulist ["Level 26 - Alarming Screech - 3s cast time - 1500 range - 6% power cost"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "バンシー 1.121B"],
     text "バンシーはフルリスペックされる。",
     br [] [],
     text "pulsing AoE nearsight は Ethereal Shriek スペックに戻される。",
     ulist ["Level 2 - Vanquish Sight - 2.0 sec cast - 1800 range - 200 radius - 4 power (+2/tick)",
            "Level 12 - Abolish Sight - 2.0 sec cast - 1850 range - 250 radius - 7 power (+5/tick)",
            "Level 22 - Eliminate Sight - 2.0 sec cast - 1900 range - 300 radius - 12 power (+7/tick)",
            "Level 32 - Purge Sight - 2.0 sec cast - 1950 range - 350 radius - 16 power (+9/tick)",
            "Level 42 - Expel Sight - 2.0 sec cast - 2000 range - 400 radius - 20 power (+12/tick)"],
     text "以下のスペルは削除されていたが 1.121 で記載漏れしていた。",
     ulist [ "Befriend", "PBAoE Acuity shear", "Fear" ]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "バンシー 1.122B"],
     text "バンシーはフルリスペックされる。",
     sechib "Spectral Guard (スペック)",
     text "新しく AoE cone slow 呪文が追加される。",
     ulist ["Level 7 - Slowing Scream - 詠唱2.5秒 - 700 range cone  - 持続時間15秒 - 11 power - slow 10%",
            "Level 17 - Slowing Shriek - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 23 power - slow 20%",
            "Level 27 - Slowing Shrill - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 35 power - slow 30%",
            "Level 37 - Slowing Wail - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 50 power - slow 50%",
            "Level 47 - Slowing Cry - 詠唱2.5秒 - 700 range cone - 持続時間15秒 - 62 power - slow 75%"],
     text "レベル47 AoE cone root はレベル46に移動する。",
     sechib "Ethereal Shriek (スペック)",
     text "このラインの呪文は再調整される。",
     br [] [],
     text "弓ダメージ吸収オーラは削除される。",
     br [] [],
     text "AoE cold DD スペルのレベルは 1, 11, 21, 31, 41 となる。威力は変わらない。",
     br [] [],
     text "AoE nearsight のレベルは 2, 12, 22, 32, 42 となる。威力は変わらない。",
     br [] [],
     text "AoE Dexterity/Quickness debuff のレベルは 3, 13, 23, 33, 43 となる。威力は変わらない。",
     br [] [],
     text "AoE Bolt のレベルは 5, 15, 25, 45 となる。威力は変わらない。レベル45の AoE bolt Deafening Cascade のダメージは296から315に増加する。",
     br [] [],
     text "単体 cold direct damage スペルのレベルは 7, 17, 27, 37, 47 となる。威力は変わらない。",
     text "新しく単体ペット fear (退散後に60秒の無効時間が発生する)が追加される。",
     ulist ["Level 8 - Fear Minion - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 18 - Expel Minion - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 28 - Intimidate Minion - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 38 - Daunt Minion - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 48 - Terrify Minion - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。"]]


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "バンシー Hot Fix Changes - 2/2/17"],
     sechib "Spectral Guard (スペック)",
     text "新しいペット召喚スペルが追加される。",
     ulist ["Level 50 - Sound Vortex - 1500 range - 詠唱10秒 - 持続時間20秒 - 4秒毎 - 再使用10分 - 25% power - グラウンドターゲットの地点に Sound Vortex を召喚する。Sound Vortex は1500以内にいる最大8つのターゲットに対して300ダメージを与える。Sound Vortex を破壊、スタン、fear することができるが mezz, 混乱は無効である。同一エリアに最大3体まで設置可能。このスペルはすでに 50 Spectral Guard のスキルを持っていてもリスペックしないとスキルラインに現れない。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B ++ patch_1_122B ++ patch_20170202
