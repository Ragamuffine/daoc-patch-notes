module Friar exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "フライアー 1.121"],
     text "フライアーはフルリスペックされる。",
     secalb "Rejuvenation (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secalb "Rejuvenation (スペック)",
     text "新しい cure mesmerization 能力を追加",
     ulist ["Level 26 - Awaken Soul - 3s cast time - 1500 range - 6% power cost"],
     text "新しい pulsing poison cure を追加",
     ulist ["Level 14 - Pulsing Cure Poison I - 3.5s cast - 2000 range - 20 power",
            "Level 28 - Pulsing Cure Poison II - 3.7s cast - 2000 range - 25 power"],
     text "新しい pulsing disease cure を追加",
     ulist ["Level 18 - Pulsing Cure Disease I - 3.5s cast - 2000 range - 20 power",
            "Level 36 - Pulsing Cure Disease II - 3.7s cast - 2000 range - 28 power"],
     secalb "Enhancements (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つだけになる。2000 range, 3.0 second cast, pulse は 30秒間継続。",
     ulist ["Level 13 - Golestandt's Fire - Heat/Matter/Cold resist 12%増加",
            "Level 31 - Golestandt's Breath - Heat/Matter/Cold resist 18%増加",
            "Level 46 - Golestandt's Heart - Heat/Matter/Cold resist 24%増加"],
     secalb "Staff (スペック)",
     ulist ["Level 4 - Figure Eight - 正面 - group heal に替わって 14 damage bleed",
            "Level 15 - Double Strike - Figure Eight - group heal に替わって 21% attack speed debuff",
            "Level 21 - Counter Evade - Off evade style - hinder に替わってダメージ増加",
            "Level 25 - Banish - Friar's Friend - PBAoE heal に替わって PBAOE 175 DD (spirit)",
            "Level 34 - Holy Staff - Anytime - Heal-over-Time を除去",
            "Level 39 - Friar's Fury - Counter Evade - FAE heal に替わって 14s hinder",
            "Level 50 - Exommunicate - Anytime - dd+heal に替わって 150 direct damage (spirit)"]]
