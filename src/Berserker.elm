module Berserker exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "バーサーカー 1.121"],
     text "バーサーカーはフルリスペックされる。",
     text "バーサーカーはレルムアビリティーをリスペックされる。",
     text "バーサーカーはレベル 50 で壁を登る能力 Climbing Spikes を得る。",
     text "バーサーカーのレルムアビリティーからチャージがなくなる。",
     text "バーサーカーはレベル上昇に伴ってチャージを習得する。",
     ulist ["Level 30 - Charge 1",
            "Level 35 - Charge 2",
            "Level 40 - Charge 3",
            "Level 45 - Charge 4",
            "Level 50 - Charge 5"],
     secmid "Light Tank Stances",
     text "スタンスと呼ばれる 3 つのバフが追加される。スタンスを切り替えるには最大 endurance の 60% を消費する。",
     dl [class "uk-description-list-horizontal"]
         [dt [] [text "War Stance"],
          dd [] [text "デフォルトのスタンス。レベル 5 で習得する。命中率が10% 上昇する。"],
          dt [] [text "Wild Stance"],
          dd [] [text "ダメージのスタンス。レベル 30 で習得する。移動速度が 50% 低下する。snare, root と重複する。すべての物理攻撃は bladeturn を無視する。クリティカルの確率が 20% 上昇する。melee 攻撃のダメージは 15% 上昇する。敵からの物理・魔法攻撃のダメージが 25% 上昇する。"],
          dt [] [text "Frenzy Stance"],
          dd [] [text "移動のスタンス。レベル 45 で習得する。移動速度が 15% 上昇する。戦闘中であっても speedwarp の中でも有効であるがスピード呪文とは重複しない。物理攻撃は 15% の確率でレベル 44 ペットを proc する。(この物理攻撃には弓、ML以外の投擲武器を含まない。)このペットは 25 秒間存続する。confuse で死亡する。このスタンスの間は武器の持つ proc は発動しない。すべての物理攻撃のダメージは 75% 減少する。"]],
     secmid "Left Axe (スペック)",
     ulist ["Level 4 - Doubler - Front - 16% 攻撃速度低下、ダメージやや増加",
            "Level 12 - Atrophy - Ravager - 21%, 20秒攻撃速度低下",
            "Level 21 - Scathing Blade - Doubler - 12秒 hinder",
            "Level 29 - Snowsquall - Rear - スネアはなくなる, ダメージやや増加",
            "Level 34 - Doublefrost - Anytime - ダメージやや減少",
            "Level 39 - Frosty Gaze - Comeback - ダメージ増加",
            "Level 44 - Icy Brilliance - Snowsquall - 7秒スタン, ダメージやや増加",
            "Level 50 - Aurora Borealis - Side - ダメージやや増加"],
     secmid "Axe (スペック)",
     ulist ["Level 15 - Evernight - Rear - スネアはなくなる, ダメージやや増加",
            "Level 29 - Havoc - Anytime - ダメージやや減少",
            "Level 39 - Glacial Movement - Side - ダメージ増加",
            "Level 44 - Arctic Rfit - Evernight - ダメージ増加",
            "Level 50 - Tyr's Fury - Glacial Movement - ダメージやや増加"],
     secmid "Hammer (スペック)",
     ulist ["Level 18 - Demolish - Frost Hammer - ダメージ増加",
            "Level 29 - Conquer - Rear - スネアはなくなる, ダメージやや増加",
            "Level 32 - Comminute - Anytime - ダメージ減少",
            "Level 44 - Sledgehammer - Conquer - ダメージ増加"],
     secmid "Sword (スペック)",
     ulist ["Level 15 - Aurora - Northern Lights followup - Damage increased slightly",
            "Level 29 - Rush - Parry reactionary followup is now a first-in-chain side positional - 21% 攻撃速度低下 effect replaced with a 15s hinder",
            "Level 34 - Polar Rift - Anytime - ダメージ減少",
            "Level 50 - Ragnarok - Rear - スネアはなくなる, ダメージ増加"]]
