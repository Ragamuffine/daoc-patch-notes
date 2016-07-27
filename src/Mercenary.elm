module Mercenary exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "マーセナリー 1.121"],
     text "マーセナリーはフルリスペックされる。",
     text "マーセナリーはレルムアビリティーをリスペックされる。",
     text "マーセナリーはレベル 50 で壁を登る能力 Climbing Spikes を得る。",
     text "マーセナリーのレルムアビリティーからチャージがなくなる。",
     text "マーセナリーはレベル上昇に伴ってチャージを習得する。",
     ulist ["Level 30 - Charge 1",
            "Level 35 - Charge 2",
            "Level 40 - Charge 3",
            "Level 45 - Charge 4",
            "Level 50 - Charge 5"],
     secalb "Light Tank Stance",
     text "スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。",
     dl [class "uk-description-list-horizontal"]
         [dt [] [text "Way of the Mercenary"],
          dd [] [text "デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。"],
          dt [] [text "Way of the Soldier"],
          dd [] [text "ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。"],
          dt [] [text "Way of the Rogue"],
          dd [] [text "移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 35% 減少する。敵からの物理・魔法攻撃のダメージは 10% 減少する。"]],
     secalb "Dual Wield (スペック)",
     ulist ["Level 21 - Penumbra - Rear - スネアはなくなる, 26% attack speed debuff 追加, スタイルダメージ増加",
            "Level 34 - Dark Tendrils - Anytime - スタイルダメージ減少",
            "Level 50 - Dark Shadows - Penumbra - 7秒スタンに替わり 30% attack speed debuff, スタイルダメージ増加"],
     secalb "Slash (スペック)",
     ulist ["Level 39 - Backslash - Rear positional - スネアはなくなる, スタイルダメージ増加"],
     secalb "Thrust (スペック)",
     ulist ["Level 29 - Pierce - Rear positional - スネアはなくなる, スタイルダメージ増加"],
     secalb "Crush (スペック)",
     ulist ["Level 25 - Divine Hammer - Rear positional - スネアはなくなる, スタイルダメージ増加"]]
 

