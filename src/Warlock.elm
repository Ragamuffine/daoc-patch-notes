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


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
      ++ patch_1_122C_HotFixNotes
