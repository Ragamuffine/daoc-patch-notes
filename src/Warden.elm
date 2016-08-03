module Warden exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウォーデン 1.121"],
     text "ウォーデンはフルリスペックされる。",
     sechib "Regrowth (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     sechib "Regrowth (スペック)",
     text "新しい pulsing poison cure を追加",
     ulist ["Level 14 - Pulsing Cure Poison I - 3.5s cast - 2000 range - 20 power",
            "Level 28 - Pulsing Cure Poison II - 3.7s cast - 2000 range - 25 power"],
     text "新しい pulsing disease cure を追加",
     ulist ["Level 18 - Pulsing Cure Disease I - 3.5s cast - 2000 range - 20 power",
            "Level 36 - Pulsing Cure Disease II - 3.7s cast - 2000 range - 28 power"],
     sechib "Nurture (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。この buff は CL buff およびパラディンの resist buff とスタックしない。",
     ulist ["Level 13 - Glimmer Shield - Spirit/Energy/Body resist 12%増加",
            "Level 30 - Glimmer Guard - Spirit/Energy/Body resist 18%増加",
            "Level 40 - Glimmer Barrier - Spirit/Energy/Body resist 24%増加"],
     sechib "Shield (スペック)",
     ulist ["Level 44 - Immobilize - 側面 - 21s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.",
            "Level 46 - Cripple - 背後 - 23s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus."]]
