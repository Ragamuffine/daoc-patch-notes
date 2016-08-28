module Main exposing (..)

import Html exposing (Html, div, text, article, hr, a, nav, ul, li, h2)
import Html.App
import Html.Attributes exposing (class, style, href)
import Html.Events exposing (onClick)
import Message exposing (..)
import Style exposing (..)
import Patch1_121
import Animist
import Armsman
import Bainshee
import Bard
import Berserker
import Blademaster
import Bonedancer
import Cabalist
import Champion
import Cleric
import Druid
import Eldritch
import Enchanter
import Friar
import Healer
import Heretic
import Hero
import Hunter
import Infiltrator
import Mauler
import Mentalist
import Mercenary
import Minstrel
import Necromancer
import Nightshade
import Paladin
import Ranger
import Reaver
import Runemaster
import Savage
import Scout
import Shadowblade
import Shaman
import Skald
import Sorcerer
import Spiritmaster
import Thane
import Theurgist
import Valewalker
import Valkyrie
import Vampiir
import Warden
import Warlock
import Warrior
import Wizard

-- MODEL

type alias Model = Message


init : ( Model, Cmd Message )
init = ( TopPage, Cmd.none )

-- VIEW

top_menu : Html Message
top_menu =
    nav [class "uk-navbar"]
        [ul [class "uk-navbar-nav"]
             [li [] [a [onClick TopPage] [text "DAoC Patch Notes"]],
              li [] [a [onClick AlbionPage] [text "アルビオン"]],
              li [] [a [onClick MidgardPage] [text "ミッドガルド"]],
              li [] [a [onClick HiberniaPage] [text "ヒベルニア"]]]]


raw_link : String -> Html Message
raw_link link =
    a [href link] [text link]


top_page : Html Message
top_page =
    div []
        [top_menu,
         make_top_content
             [h2 [] [text "パッチノート"],
              ul []
                  [li [] [a [onClick Patch_1_121_Page] [text "1.121"], text " 公式リンク ", raw_link "http://darkageofcamelot.com/content/1121-live-patch-notes", text " (2016/7/26)"],
                   li [] [a [onClick Patch_1_121B_Page] [text "1.121B"], text " 公式リンク ", raw_link "http://darkageofcamelot.com/content/1121b-live-patch-notes", text " (2016/8/16)"],
                   li [] [a [onClick Patch_1_121C_Page] [text "1.121C"], text " 公式リンク ", raw_link "http://darkageofcamelot.com/article/1121c-hot-fix-update", text " (2016/8/24)"]],
              h2 [] [text "クラス"],
              div [class "uk-grid"]
                  [div [class "uk-width-medium-1-3 uk-row-first"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick AlbionPage, style [( "color", color_alb )]] [text "アルビオン"],
                                    a [onClick ArmsmanPage] [text "アームズマン"],
                                    a [onClick MercenaryPage] [text "マーセナリー"],
                                    a [onClick PaladinPage] [text "パラディン"],
                                    a [onClick ReaverPage] [text "リーバー"],
                                    a [onClick ClericPage] [text "クレリック"],
                                    a [onClick FriarPage] [text "フライアー"],
                                    a [onClick HereticPage] [text "ヘレティック"],
                                    a [onClick WizardPage] [text "ウィザード"],
                                    a [onClick SorcererPage] [text "ソーサラー"],
                                    a [onClick TheurgistPage] [text "サージスト"],
                                    a [onClick CabalistPage] [text "カバリスト"],
                                    a [onClick NecromancerPage] [text "ネクロマンサー"],
                                    a [onClick InfiltratorPage] [text "インフィルトレーター"],
                                    a [onClick ScoutPage] [text "スカウト"],
                                    a [onClick MinstrelPage] [text "ミンストレル"]]]],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick MidgardPage, style [( "color", color_mid )]] [text "ミッドガルド"],
                                    a [onClick WarriorPage] [text "ウォリアー"],
                                    a [onClick ThanePage] [text "セイン"],
                                    a [onClick BerserkerPage] [text "バーサーカー"],
                                    a [onClick SkaldPage] [text "スカルド"],
                                    a [onClick SavagePage] [text "サヴェジ"],
                                    a [onClick ValkyriePage] [text "ヴァルキリー"],
                                    a [onClick HealerPage] [text "ヒーラー"],
                                    a [onClick ShamanPage] [text "シャーマン"],
                                    a [onClick RunemasterPage] [text "ルーンマスター"],
                                    a [onClick SpiritmasterPage] [text "スピリットマスター"],
                                    a [onClick BonedancerPage] [text "ボーンダンサー"],
                                    a [onClick WarlockPage] [text "ウォーロック"],
                                    a [onClick ShadowbladePage] [text "シャドウブレード"],
                                    a [onClick HunterPage] [text "ハンター"]]]],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [onClick HiberniaPage, style [( "color", color_hib )]] [text "ヒベルニア"],
                                    a [onClick HeroPage] [text "ヒーロー"],
                                    a [onClick BlademasterPage] [text "ブレードマスター"],
                                    a [onClick ChampionPage] [text "チャンピオン"],
                                    a [onClick ValewalkerPage] [text "ヴェールウォーカー"],
                                    a [onClick VampiirPage] [text "ヴァンピール"],
                                    a [onClick DruidPage] [text "ドルイド"],
                                    a [onClick BardPage] [text "バード"],
                                    a [onClick WardenPage] [text "ウォーデン"],
                                    a [onClick EldritchPage] [text "エルドリッチ"],
                                    a [onClick EnchanterPage] [text "エンチャンター"],
                                    a [onClick MentalistPage] [text "メンタリスト"],
                                    a [onClick AnimistPage] [text "アニミスト"],
                                    a [onClick BainsheePage] [text "バンシー"],
                                    a [onClick NightshadePage] [text "ナイトシェード"],
                                    a [onClick RangerPage] [text "レンジャー"]]]]],
              div [class "uk-grid"]
                  [div [class "uk-width-medium-1-3 uk-row-first"] [],
                   div [class "uk-width-medium-1-3"]
                       [ul [class "uk-nav uk-nav-side uk-width-medium-2-3"]
                            [li [] [a [style [( "color", color_common )]] [text "共通"],
                                    a [onClick MaulerPage] [text "モーラー"]]]]]]]


albion_page : Html Message
albion_page =
    div []
        [top_menu,
         make_content (Armsman.all ++ Cabalist.all ++ Cleric.all ++ Friar.all ++ Heretic.all ++ Infiltrator.all ++ Mauler.all ++ Mercenary.all ++ Minstrel.all ++ Necromancer.all ++ Paladin.all ++ Scout.all ++ Reaver.all ++ Sorcerer.all ++ Theurgist.all ++ Wizard.all)]


midgard_page : Html Message
midgard_page =
    div []
        [top_menu,
         make_content (Berserker.all ++ Bonedancer.all ++ Healer.all ++ Hunter.all ++ Mauler.all ++ Runemaster.all ++ Savage.all ++ Shadowblade.all ++ Shaman.all ++ Skald.all ++ Spiritmaster.all ++ Thane.all ++ Valkyrie.all ++ Warlock.all ++ Warrior.all)]


hibernia_page : Html Message
hibernia_page =
    div []
        [top_menu,
         make_content (Animist.all ++ Bainshee.all ++ Bard.all ++ Blademaster.all ++ Champion.all ++ Druid.all ++ Eldritch.all ++ Enchanter.all ++ Hero.all ++ Mauler.all ++ Mentalist.all ++ Nightshade.all ++ Ranger.all ++ Valewalker.all ++ Vampiir.all ++ Warden.all)]


view : Model -> Html Message
view model =
    case model of
        TopPage -> top_page
        Patch_1_121_Page -> div [] [top_menu, make_content Patch1_121.patch_1_121]
        Patch_1_121B_Page -> div [] [top_menu, make_content Patch1_121.patch_1_121B]
        Patch_1_121C_Page -> div [] [top_menu, make_content Patch1_121.patch_1_121C]
        AlbionPage -> albion_page
        MidgardPage -> midgard_page
        HiberniaPage -> hibernia_page
        AnimistPage -> div [] [top_menu, make_content Animist.all]
        ArmsmanPage -> div [] [top_menu, make_content Armsman.all]
        BainsheePage -> div [] [top_menu, make_content Bainshee.all]
        BardPage -> div [] [top_menu, make_content Bard.all]
        BerserkerPage -> div [] [top_menu, make_content Berserker.all]
        BlademasterPage -> div [] [top_menu, make_content Blademaster.all]
        BonedancerPage -> div [] [top_menu, make_content Bonedancer.all]
        CabalistPage -> div [] [top_menu, make_content Cabalist.all]
        ChampionPage -> div [] [top_menu, make_content Champion.all]
        ClericPage -> div [] [top_menu, make_content Cleric.all]
        DruidPage -> div [] [top_menu, make_content Druid.all]
        EldritchPage -> div [] [top_menu, make_content Eldritch.all]
        EnchanterPage -> div [] [top_menu, make_content Enchanter.all]
        FriarPage -> div [] [top_menu, make_content Friar.all]
        HealerPage -> div [] [top_menu, make_content Healer.all]
        HereticPage -> div [] [top_menu, make_content Heretic.all]
        HeroPage -> div [] [top_menu, make_content Hero.all]
        HunterPage -> div [] [top_menu, make_content Hunter.all]
        InfiltratorPage -> div [] [top_menu, make_content Infiltrator.all]
        MaulerPage -> div [] [top_menu, make_content Mauler.all]
        MentalistPage -> div [] [top_menu, make_content Mentalist.all]
        MercenaryPage -> div [] [top_menu, make_content Mercenary.all]
        MinstrelPage -> div [] [top_menu, make_content Minstrel.all]
        NecromancerPage -> div [] [top_menu, make_content Necromancer.all]
        NightshadePage -> div [] [top_menu, make_content Nightshade.all]
        PaladinPage -> div [] [top_menu, make_content Paladin.all]
        RangerPage -> div [] [top_menu, make_content Ranger.all]
        ReaverPage -> div [] [top_menu, make_content Reaver.all]
        RunemasterPage -> div [] [top_menu, make_content Runemaster.all]
        SavagePage -> div [] [top_menu, make_content Savage.all]
        ScoutPage -> div [] [top_menu, make_content Scout.all]
        ShadowbladePage -> div [] [top_menu, make_content Shadowblade.all]
        ShamanPage -> div [] [top_menu, make_content Shaman.all]
        SkaldPage -> div [] [top_menu, make_content Skald.all]
        SorcererPage -> div [] [top_menu, make_content Sorcerer.all]
        SpiritmasterPage -> div [] [top_menu, make_content Spiritmaster.all]
        ThanePage -> div [] [top_menu, make_content Thane.all]
        TheurgistPage -> div [] [top_menu, make_content Theurgist.all]
        ValewalkerPage -> div [] [top_menu, make_content Valewalker.all]
        ValkyriePage -> div [] [top_menu, make_content Valkyrie.all]
        VampiirPage -> div [] [top_menu, make_content Vampiir.all]
        WardenPage -> div [] [top_menu, make_content Warden.all]
        WarlockPage -> div [] [top_menu, make_content Warlock.all]
        WarriorPage -> div [] [top_menu, make_content Warrior.all]
        WizardPage -> div [] [top_menu, make_content Wizard.all]

-- UPDATE

update : Message -> Model -> ( Model, Cmd Message )
update message model =
    ( message, Cmd.none )

-- SUBSCRIPTIONS

subscriptions : Model -> Sub Message
subscriptions model =
    Sub.none

-- MAIN

main : Program Never
main =
    Html.App.program { init = init,
                       view = view,
                       update = update,
                       subscriptions = subscriptions }
