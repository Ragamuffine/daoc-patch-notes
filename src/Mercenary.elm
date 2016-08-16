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
          dd [] [text "移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。"]],
     secalb "Dual Wield (スペック)",
     ulist ["Level 21 - Penumbra - Rear - スネア削除, 26% attack speed debuff 追加, ダメージやや増加",
            "Level 29 - Misty Gloom - Flank - ダメージ増加",
            "Level 39 - Shadow's Rain - Side - ダメージやや増加",
            "Level 34 - Dark Tendrils - Anytime - スタイルダメージ減少",
            "Level 44 - Hypnotic Darkness - Reflection - ダメージ増加、攻撃ボーナス減少、低防御ボーナス",
            "Level 50 - Dark Shadows - Penumbra - 30% attack speed debuff, スタイルダメージ増加"],
     secalb "Slash (スペック)",
     ulist ["Level 34 - Amethyst Slash - Anytime - ダメージ減少",
            "Level 39 - Backslash - Rear - スネア削除, ダメージやや増加"],
     secalb "Thrust (スペック)",
     ulist ["Level 29 - Pierce - Rear - スネア削除, スタイルダメージ増加",
            "Level 34 - Liontooth - Anytime - ダメージ減少"],
     secalb "Crush (スペック)",
     ulist ["Level 21 - Protector - Anytime - ダメージ減少",
            "Level 25 - Divine Hammer - Rear - スネア削除, ダメージやや増加"]]
