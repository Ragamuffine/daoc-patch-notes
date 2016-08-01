module Druid exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ドルイド 1.121"],
     text "ドルイドはフルリスペックされる。",
     sechib "Regrowth (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     sechib "Nurture (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 3.0 second cast, pulse は 30秒間継続。",
     ulist ["Level 13 - Warmth of the Badger - Increases Heat/Matter/Cold resist 12%増加",
            "Level 30 - Warmth of the Wolf - Increases Heat/Matter/Cold resist 18%増加",
            "Level 40 - Warmth of the Bear - Increases Heat/Matter/Cold resist 24%増加"],
     text "Nature's Cocoon (single-target focus damage shell) は次のように変更される。",
     ulist ["ダメージ吸収を 90% から 50% に変更",
            "focus ではなく target は戦闘が可能",
            "5s cast, 10秒間継続, 再使用60秒, 25% power cost",
            "level 47 から 45 に変更"],
     sechib "Nature (基本)",
     text "従来の召喚ペットはベースに移動される。",
     sechib "Nature (スペック)",
     text "AoE damage shield buff は削除される。",
     br [] [],
     text "single target グラップルが追加される。",
     ulist ["Level 14 - Forest's Pull - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 5秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン",
            "Level 35 - Forest's Reach - 1000 range - ターゲットは物理攻撃ができない。ターゲットは物理・魔法攻撃を受けない - 8秒間継続 - 再使用5分 - 3s cast - Druid を6秒間スタン"],
     text "新しい召喚ペットが追加される。",
     ulist ["Level 42, Call Nature Sage. ペットレベル50. melee haste buff を自分にかける。"],
     text "AoE Instant heal が追加される。",
     ulist ["Level 15 - 再使用60秒 - Heal 15%, 1500 range, 250 半径.",
            "Level 45 - 再使用60秒 - Heal 45%, 1500 range, 250 半径."],
     text "root 除去スペル Free Wind を追加",
     ulist ["level 13",
            "再使用5分, 3.0 sec cast, 1500 range, 10% power.",
            "自分に対しては使用できない。"]]
