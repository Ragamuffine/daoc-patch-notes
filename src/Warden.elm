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
     text "Fury of Nature の持続時間を30秒から15秒に変更する。",
     br [] [],
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。3秒ごと。この buff は CL buff およびバードの resist buff とスタックしない。",
     ulist ["Level 13 - Glimmer Shield - Spirit/Energy/Body resist 12%増加",
            "Level 30 - Glimmer Guard - Spirit/Energy/Body resist 18%増加",
            "Level 40 - Glimmer Barrier - Spirit/Energy/Body resist 24%増加"],
     sechib "Shield (スペック)",
     ulist ["Level 44 - Immobilize - 側面 - 21s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.",
            "Level 46 - Cripple - 背後 - 23s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus."],
     sechib "Blades (スペック)",
     text "新しいスタイルが追加される。",
     ulist ["Level 32 - Stone Shaper - Anytime - Very High endurance cost, Medium Damage, Low Hit Bonus, Medium Defense Penalty - 10秒間 -50 ABS debuff",
            "Level 40 - Stone Temper - Stone Shaper - Very High endurance cost, Very Low damage, No Hit Bonus, Low Defense Penalty - ターゲットのあらゆる ABS debuff を除去し、自分の weaponskill を25秒間25%増加させる。",
            "Level 40 - Stone Breaker - Stone Shaper - Very High endurance cost, Very High damage, High Hit Bonus, Very High Defense Penalty - ターゲットの ABS debuff と自分の weaponskill buff を除去する。"],
     sechib "Blunt (スペック)",
     text "新しいスタイルが追加される。",
     ulist ["Level 23 - Forest Protector - Anytime - Very High endurance cost, Medium Damage, Low Hit Bonus, Low Defensive Bonus - 自分が行うヒール量を25秒間50%増加させる。",
            "Level 32 - Forest Executioner - Follows Forest Protector - Very High endurance cost, Very High Damage, Low Hit Penalty, Low Defensive Bonus - ターゲットが行うヒール量を25秒間50%低下させる。"]]
