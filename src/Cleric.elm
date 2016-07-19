module Cleric exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "クレリック 1.121"],
     text "クレリックはフルリスペックされる。",
     secalb "Rejuvenation (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secalb "Enhancements (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つだけになる。2000 range, 3.0 second cast, pulse は 30秒間継続。この buff は CL buff およびパラディンの resist buff とスタックしない。",
     ulist ["Level 13 - Energy Shield - Spirit/Energy/Body resist 12%増加",
            "Level 30 - Energy Guard - Spirit/Energy/Body resist 18%増加",
            "Level 40 - Energy Barrier - Spirit/Energy/Body resist 24%増加"],
     text "Hand of God は以下のように変更される。",
     ulist ["ダメージ吸収を 85% から 50% に変更",
            "focus ではなく target は戦闘が可能",
            "5s cast, 10秒間継続, 再使用60秒, 25% power cost",
            "level 46 から 45 に変更"],
     secalb "Smite (スペック)",
     text "Minor Deliverance (PBAoE snare) を 7 から 6 に変更",
     text "single-target mez を追加",
     ulist ["Level 9 - Heavenly Slumber - 28秒間継続 - 3s cast - 1500 range - 5 power",
            "Level 14 - Graceful Slumber - 34秒間継続 - 3s cast - 1500 range - 8 power",
            "Level 23 - Hallowed Slumber - 40秒間継続 - 3s cast - 1500 range - 11 power",
            "Level 31 - Divine Slumber - 50秒間継続 - 3s cast - 1500 range - 15 power",
            "Level 41 - Holy Slumber - 60秒間継続 - 3s cast - 1500 range - 19 power"],
     text "single-target Instant heal を追加",
     ulist ["Level 7 - Divine Light - 再使用60秒 - Heal 15% - 2000 range - 40% power",
            "Level 28 - Holy Light - 再使用60秒 - Heal 25% - 2000 range - 40% power",
            "Level 46 - Pure Light - 再使用60秒 - Heal 45% - 2000 range - 40% power"],
     text "root 除去スペル Blessing of Movement を追加",
     ulist ["level 13",
            "再使用5分, 3.0 sec cast, 1500 range, 10% power.",
            "自分に対しては使用できない。"]]
