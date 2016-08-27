module Warrior exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウォリアー 1.121"],
     text "ウォリアーはフルリスペックされる。",
     secmid "Shield (スペック)",
     ulist ["Level 44 - Immobilize - 21 秒 side snare, Low defensive bonus, high end cost, low damage.",
            "Level 46 - Cripple - 23 秒 back snare,  Low defensive bonus, high end cost, low damage.",
            "Level 50 - Battle Control - PBAoE grapple - 半径400 - 最大 5 ターゲット. 再使用 10 分, instant cast, grapple タイマーを無視する"],
     secmid "Axe (スペック)",
     ulist ["Level 15 - Evernight - Rear positional - Damage increased from Medium to High",
            "Level 29 - Havoc - Anytime - ダメージ減少",
            "Level 39 - Glacial Movement - Side - ダメージ増加",
            "Level 44 - Arctic Rfit - Evernight - ダメージ増加",
            "Level 50 - Tyr's Fury - Glacial Movement - ダメージやや増加"],
     secmid "Hammer (スペック)",
     ulist ["Level 18 - Demolish - Frost Hammer - ダメージ増加",
            "Level 29 - Conquer - Rear - ダメージ増加",
            "Level 32 - Comminute - Anytime - ダメージ減少",
            "Level 44 - Sledgehammer - Conquer - ダメージ増加"],
     secmid "Sword (スペック)",
     ulist ["Level 15 - Aurora - Northern Lights - ダメージやや増加",
            "Level 34 - Polar Rift - Anytime - ダメージ減少",
            "Level 50 - Ragnarok - Rear - ダメージ増加"]]


all : List (Html Message)
all = patch_1_121
