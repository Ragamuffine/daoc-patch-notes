module Blademaster exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ブレードマスター 1.121"],
     text "ブレードマスターはフルリスペックされる。",
     text "ブレードマスターはレルムアビリティーをリスペックされる。",
     text "ブレードマスターのレルムアビリティーからチャージがなくなる。",
     text "ブレードマスターはレベル上昇に伴ってチャージを習得する。",
     ulist ["Level 30 - Charge 1",
            "Level 35 - Charge 2",
            "Level 40 - Charge 3",
            "Level 45 - Charge 4",
            "Level 50 - Charge 5"],
     sechib "Light Tank Stances",
     text "スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。",
     dl [class "uk-description-list-horizontal"]
         [dt [] [text "Balanced Blades"],
          dd [] [text "デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。"],
          dt [] [text "Punishing Blades"],
          dd [] [text "ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。"],
          dt [] [text "Dancing Blades"],
          dd [] [text "移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。"]],
     sechib "Celtic Dual (スペック)",
     ulist ["Level 15 - Thunderstorm - Detaunt anytime - Defensive bonus とスタイルダメージを他の detaunt スタイル並に減少",
            "Level 21 - Hurricane - Rear - スネアはなくなる, ダメージ増加",
            "Level 29 - Tempest - Ice Storm - ダメージ増加",
            "Level 34 - Meteor Shower - Anytime - ダメージ減少",
            "Level 44 - Twin Star - Tornado - ダメージ増加",
            "Level 50 - Supernova - Hurricane - 7秒スタン, スタイルダメージ増加"],
     sechib "Blunt (スペック)",
     ulist ["Level 25 - Back Crush - Rear - スネアはなくなる, ダメージやや増加",
            "Level 34 - Mauler - Anytime - ダメージ減少",
            "Level 39 - Stunning Blow - Parry - 15秒 hinder"],
     sechib "Pierce (スペック)",
     ulist ["Level 12 - Black Widow - Rear - スネアはなくなる, ダメージやや増加",
            "Level 34 - Asp’s Bite - Anytime - ダメージ減少"],
     sechib "Blades (スペック)",
     ulist ["Level 34 - Revenging Blade - Rear - スネアはなくなる, ダメージやや増加",
            "Level 44 - Prismatic Blade - Anytime - ダメージ減少"]]
