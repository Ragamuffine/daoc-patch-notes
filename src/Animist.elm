module Animist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "アニミスト 1.121"],
     text "アニミストはフルリスペックされる。",
     sechib "Arboreal Path (基本)",
     ulist ["level 45 lifedrain のダメージを164から179に増加させる。"],
     sechib "Arboreal Mastery (スペック)",
     text "動きは遅いが大ダメージの bomber を追加する。この bomber は破壊が可能。また stun で止めることも可能。confuse で破壊される。",
     text "1875 range, 詠唱時間5秒、再使用2分、持続時間5分、quickcast不可.",
     ulist ["Level 13 - Heavy Spirit. 99 body damage.",
            "Level 23 - Plump Spirit. 199 body damage.",
            "Level 33 - Inflated Spirit. 329 body damage.",
            "Level 45 - Bulging Spirit. 499 body damage."],
     sechib "Creeping Mastery (スペック)",
     text "AoE root の距離を 1500 から 1875 に延長する。",
     text "Body resistance debuff, PBAoE melee DPS debuff ペットを除去する。",
     text "新しい damage bomber スペルを追加",
     ulist ["Level 7 - Spirit of Deceit - 2.8s cast - 1500 range - 34 matter damage - 5 power cost",
            "Level 16 - Spirit of Cunning - 2.8s cast - 1500 range - 68 matter damage - 10 power cost",
            "Level 27 - Spirit of Trickery - 2.8s cast - 1500 range - 122 matter damage - 13 power cost",
            "Level 38 - Spirit of Deception - 2.8s cast - 1500 range - 153 matter damage - 25 power cost",
            "Level 47 - Spirit of Guile - 2.8s cast - 1500 range - 199 matter damage - 31 power cost"],
     text "新しい ground-targeted の healing shroom を追加",
     ulist ["Level 9 - Grove Sibyl - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 20 hit point heal, 850 range",
            "Level 21 - Grove Augur - 5s cast - 1500 range - 120秒間継続 - 38 power cost - 55 hit point heal, 850 range",
            "Level 32 - Grove Oracle - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 100 hit point heal, 850 range",
            "Level 42 - Grove Druid - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 215 hit point heal, 850 range"],
    text "新しい ground-targeted の diseasing shroom を追加",
    ulist ["Level 5 - Forest's Blight - 5s cast - 1500 range - 120秒間継続 - 8 power cost - 10秒間 disease(850 range, 5 str debuff, 3% snare)",
           "Level 14 - Forest's Curse - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 15秒間 disease(850 range, 10 str debuff, 6% snare)",
           "Level 20 - Forest's Scourge - 5s cast - 1500 range - 120秒間継続 - 34 power cost - 30秒間 disease(850 range, 15 str debuff, 9% snare)",
           "Level 31 - Forest's Torment - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 30秒間 disease(850 range, 20 str debuff, 12% snare)",
           "Level 41 - Forest's Menace - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 30秒間 disease(850 range, 25 str debuff, 15% snare)"],
    text "新しい instant-cast, ground-targeted の healing shroom を追加",
    ulist ["Level 50 - Shroom of Life - instant cast - 10秒間継続 - 30 power - 400 pbaoe hit point heal, 350 range"],
    text "AoE root スペルの射程は延長される。",
    ulist ["Level 12 - 1500 range",
           "Level 18 - 1575 range",
           "Level 26 - 1655 range",
           "Level 34 - 1765 range",
           "Level 44 - 1875 range"],
    text "Creeping spec にある body resistance debuff/PBAoE melee DPS debuff ペットは削除される。"]


patch_1_121C : List (Html Message)
patch_1_121C =
    [h2 [] [text "アニミスト 1.121C"],
     text "打ちっぱなし型の turret pet の詠唱時間は5秒から3.5秒に減少する。controlled pet は依然5秒のままである。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "アニミスト 1.122B"],
     sechib "Creeping Path (スペック)",
     text "単体AFデバフの値は以下のように変更される。",
     ulist ["Level 30 - Spoil Armor - 50 から 100 に増加",
            "Level 40 - Decompose Armor - 100 から 165 に増加",
            "Level 49 - Decay Armor - 150 から 250 に増加"]]


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "アニミスト Hot Fix Changes - 2/2/17"],
     sechib "Creeping Path (スペック)",
     text "Shroom of Life は以下のように変更される。",
     ulist ["グラウンドターゲットではなく単体ターゲットになる。",
            "ペットはレベル50になる。",
            "ペットは mezz に耐性を持つ。(スタン、混乱は受ける。)"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121C ++ patch_1_122B ++ patch_20170202
