module Warlock exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウォーロック 1.121"],
     text "ウォーロックはフルリスペックされる。",
     text "ウォーロックはレルムアビリティーをリスペックされる。",
     text "レルムアビリティーに Ichor of the Deep が追加される。",
     secmid "Witchcraft (スペック)",
     text "すべての DoT は除去され新しい DoT に置き換えられる。",
     br [] [],
     text "Dread",
     ulist ["Level 8 - Weak Dread - 25秒間継続 - 5秒ごと - 10 body damage - 自分に対し 10 magic-ablative buff - instant cast",
            "Level 22 - Minor Dread - 25秒間継続 - 5秒ごと - 20 body damage - 自分に対し 25 magic-ablative buff - instant cast",
                "Level 32 - Lesser Dread - 25秒間継続 - 5秒ごと - 35 body damage - 自分に対し 50 magic-ablative self - instant cast",
                "Level 42 - Dread - 25秒間継続 - 5秒ごと - 55 body damage - 自分に対し 100 magic-ablative buff - instant cast"],
     text "Anguish",
     ulist ["Level 14 - Weak Anguish - 30秒間継続 - 4秒ごと - 12 matter damage - 3s cast time",
            "Level 24 -Minor Anguish - 30秒間継続 - 4秒ごと - 37 matter damage - 3s cast time",
            "Level 34 - Lesser Anguish - 30秒間継続 - 4秒ごと - 47 matter damage - 3s cast time",
            "Level 44 - Anguish - 30秒間継続 - 4秒ごと - 60 matter damage - 3s cast time"],
     text "Agony - Dread と Anguish が効果中であるターゲットに使用できる",
     ulist ["Level 27 - Minor Agony - 25秒間継続 - 3秒ごと - 30 cold damage - 3s cast time - disease",
            "Level 37 - Lesser Agony - 25秒間継続 - 3秒ごと - 60 cold damage - 3s cast time - disease",
            "Level 47 - Agony - 25秒間継続 - 3秒ごと - 110 cold damage - 3s cast time - disease"],
     text "Doom - Dread, Anguish, Agony がすべて効果中のターゲットに使用できる",
     ulist ["Level 50 - Doom - 10秒間継続 - 2.5秒ごと - 205 spirit damage - 3s cast time - cure されるまたは効果が切れると 700 direct damage. パージされた時のみ回避可能。"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ウォーロック 1.122B"],
     text "ウォーロックはフルリスペックされる。",
     secmid "Cursing (基本)",
     text "単体 DD 呪文は matter から spirit 属性に変更された。",
     secmid "Witchcraft (スペック)",
     text "単体 AF デバフは変更されている。",
     ulist ["Level 30 - Degrade Armor - 50 から 100 に増加",
            "Level 40 - Rot Armor - 100 から 165 に増加",
            "Level 50 - Erode Armor - 150 から 250 に増加"],
     text "Doom は essence 属性に変更された。",
     secmid "Hexing (スペック)",
     text "単体ペット fear (退散後に60秒の無効時間が存在する)は以下のように変更になる。",
     ulist ["Level 1 - Fear Slave - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 11 - Expel Slave - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 21 - Intimidate Slave - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 31 - Daunt Slave - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 41 - Terrify Slave - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。"],
     text "新しいペット fear に応じて以下の呪文が変更になる。",
     ulist ["Level 31 - Hex of Tangling Root は level 28 になる。",
            "Level 41 - Hex of Hindering は level 36 になる。"]]


patch_1_122C_HotFixNotes : List (Html Message)
patch_1_122C_HotFixNotes =
    [h2 [] [text "ウォーロック The Ghost Keep RvR Event and Hot Fix Notes"],
     secmid "Witchcraft (スペック)",
     text "すべての AF debuff スペルの持続時間は45秒から15秒に減少する。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ウォーロック 1.123"],
     text "ウォーロックはフルリスペックされる。",
     secmid "Witchcraft (スペック)",
     ulist ["Level 47 - Agony - ダメージが 110 から 125 に増加する。",
            "Level 50 - Doom - ダメージが 205 から 215 に増加する。Detonate のダメージは 425 から 475 に増加する。"],
     text "AFデバフの継続時間は15秒から20秒に増加する。",
     br [] [],
     text "ヒール増幅オーラが新しく追加される。",
     ulist ["Level 9 - Relaxing Incantation - 1500 range - 3.0s cast - 8秒継続 - 8秒ごと - 10% power - グループメンバーへのヒール量が2%増加する。",
            "Level 19 - Restful Incantation - 1500 range - 3.0s cast - 8秒継続 - 8秒ごと - 10% power - グループメンバーへのヒール量が4%増加する。",
            "Level 27 - Soothing Incantation - 1500 range - 3.0s cast - 8秒継続 - 8秒ごと - 10% power - グループメンバーへのヒール量が6%増加する。",
            "Level 34 - Calming Incantation - 1500 range - 3.0s cast - 8秒継続 - 8秒ごと - 10% power - グループメンバーへのヒール量が10%増加する。",
            "Level 45 - Ameliorating Incantation - 1500 range - 3.0s cast - 8秒継続 - 8秒ごと - 10% power - グループメンバーへのヒール量が15%増加する。"],
     text "新しい AoE DoT スペルが追加される。このスペルはトレーニングウィンドウには表示されない。",
     ulist ["Level 3 - Puny Misery - 1500 range - 半径350 - 3.0s cast - 12秒継続 - 2秒ごと - 9 power - 12秒間2秒ごとに 6 spirit damage",
            "Level 13 - Weak Misery - 1500 range - 半径350 - 3.0s cast - 12秒継続 - 2秒ごと - 17 power - 12秒間2秒ごとに 33 spirit damage",
            "Level 23 - Minor Misery - 1500 range - 半径350 - 3.0s cast - 12秒継続 - 2秒ごと - 23 power - 12秒間2秒ごとに 53 spirit damage",
            "Level 33 - Lesser Misery - 1500 range - 半径350 - 3.0s cast - 12秒継続 - 2秒ごと - 36 power - 12秒間2秒ごとに 65 spirit damage",
            "Level 43 - Misery - 1500 range - 半径350 - 3.0s cast - 12秒継続 - 2秒ごと - 47 power - 12秒間2秒ごとに 83 spirit damage"],
     text "グループヒールは以下のように強化される。",
     ulist ["Level 15 - Confluence of Renewal - 103ヘルス回復",
            "Level 29 - Confluence of Restoration - 163ヘルス回復",
            "Level 38 - Confluence of Healing - 223ヘルス回復",
            "Level 46 - Confluence of Mending - 283ヘルス回復"]]


patch_1_123B : List (Html Message)
patch_1_123B =
    [h2 [] [text "ウォーロック 1.123B"],
     secmid "Witchcraft (スペック)",
     text "Doom は通常の魔法になる。",
     text "Doom は Essence 属性から Matter 属性に変更される。",
     text "Doom の DoT は duration bonus で継続時間を伸ばすことが可能になる。同様に Matter レジストによって短縮されるようになる。",
     secmid "Hexing (スペック)",
     text "妨害不可第一魔法は以下のように変更される。",
     ulist ["Level 2 - Steady Cast - ダメージ低下量40%から50%へ。パワーコスト増加32%から40%へ。",
            "Level 12 - Solid Cast - ダメージ低下量35%から40%へ。パワーコスト増加25%から32%へ。",
            "Level 22 - Fixed Cast - ダメージ低下量30%から35%へ。パワーコスト増加19%から25%へ。",
            "Level 29 - Fortified Cast - ダメージ低下量25%のまま。パワーコスト増加14%から19%へ。",
            "Level 39 - Anchored Cast - ダメージ低下量20%のまま。パワーコスト増加10%から14%へ。",
            "Level 48 - Unshakeable Cast - ダメージ低下量10%のまま。パワーコスト増加7%から10%へ。"],
     text "単体ペット退散魔法の持続時間が以下のように短縮される。",
     ulist ["Level 11 - Expel Slave - 13秒から9秒へ。",
            "Level 21 - Intimidate Slave - 21秒から15秒へ。",
            "Level 31 - Daunt Slave - 30秒から22秒へ。",
            "Level 41 - Terrify Slave - 42秒から30秒へ。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
      ++ patch_1_122C_HotFixNotes
      ++ patch_1_123
      ++ patch_1_123B
