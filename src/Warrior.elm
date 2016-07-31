module Warrior exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウォリアー 1.121"],
     secmid "Shield (スペック)",
     ulist ["Level 44 - Immobilize - 21 秒 side snare, Low defensive bonus, high end cost, low damage.",
            "Level 46 - Cripple - 23 秒 back snare,  Low defensive bonus, high end cost, low damage.",
            "Level 50 - Battle Control - PBAoE grapple - 半径400 - 最大 8 ターゲット(ペット含む). 再使用 10 分, instant cast, grapple タイマーを無視する"],
     secmid "Axe (スペック)",
     ulist ["Level 29 - Havoc - Anytime - スタイルダメージやや減少",
            "Level 44 - Arctic Rfit - Evernight - スタイルダメージ増加"],
     secmid "Sword (スペック)",
     ulist ["Level 34 - Polar Rift - Anytime - スタイルダメージやや減少",
            "Level 50 - Ragnarok - Rear - rear snare, スタイルダメージ増加"],
     secmid "Hammer (スペック)",
     ulist ["Level 32 - Comminute - Anytime - スタイルダメージやや減少",
            "Level 44 - Sledgehammer - Conquer - スタイルダメージ増加"]]
