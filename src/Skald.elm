module Skald exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "スカルド 1.121"],
     text "スカルドはフルリスペックされる。",
     text "スカルドはレルムアビリティーをリスペックされる。",
     text "レルムアビリティー Determination を選択可能になる。",
     secmid "Battlesongs (スペック)",
     text "自己バフ Root Dampening は除去される。",
     br [] [],
     text "resist song は30分継続のバフになる。CL resist およびシャーマン、ヒーラーのレジストとスタックしない。",
     ulist ["Level 27 - Soul Bolstering Chant - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 8% 増加",
            "Level 46 - Soul Bolstering Song - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 12% 増加"],
     text "新しい speed buff を追加",
     ulist ["Crescendo, realm target, instant-cast, 再使用45秒, 7秒間継続, 130% speed buff, レベル35. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "Great Crescendo, realm target, instant-cast, 再使用45秒, 9秒間継続, 160% speed buff, レベル44. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "March of Bragi, group target, instant-cast, 再使用10分, 9秒間継続, 160% speed buff, レベル50. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。"],
     text "group fatigue reduction buff は pulse に戻る。",
     text "Moved Epiphany はレベル49になる。",
     br [] [],
     text "新しい PBAoE confuse spell が追加される。",
     ulist ["Level 27 - Disorienting Yelp - 20秒間継続 - 90s 再使用 - 500 半径 - 10% power cost",
            "Level 47 - Disorienting Cry - 20秒間継続 - 90s 再使用 - 750 半径 - 10% power cost"],
     text "新しいスペル Sleep and Stun Guard が追加される。",
     ulist ["Level 38 - Sleep Guard - Instant cast - realm-targeted - mezz を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない",
            "Level 48 - Stun Guard - Instant cast - realm-targeted - スタン(呪文)を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない"],
     text "single-target DD は power pool の30%を回復するようになる。",
     text "speed song がランダムに落ちることがなくなる。",
     secmid "Axe (スペック)",
     ulist ["Level 15 - Evernight - Rear - ダメージ増加",
            "Level 29 - Havoc - Anytime - ダメージ減少",
            "Level 39 - Glacial Movement - Side - ダメージ増加",
            "Level 44 - Arctic Rfit - Evernight - ダメージ増加",
            "Level 50 - Tyr's Fury - Glacial Movement - ダメージやや増加"],
     secmid "Sword (スペック)",
     secmid "Hammer (スペック)",
     ulist ["Level 18 - Demolish - Frost Hammer - ダメージ増加",
            "Level 29 - Conquer - Rear - ダメージ増加",
            "Level 32 - Comminute - Anytime - ダメージ減少",
            "Level 44 - Sledgehammer - Conquer - ダメージ増加"],
     ulist ["Level 15 - Aurora - Northern Lights - ダメージやや増加",
            "Level 34 - Polar Rift - Anytime - ダメージ減少",
            "Level 50 - Ragnarok - Rear - ダメージ増加"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "スカルド 1.122B"],
     text "スカルドはフルリスペックされる。",
     secmid "Battlesongs (スペック)",
     text "新しく siege ダメージ吸収オーラが追加される。",
     ulist ["Level 6 - Rhythm of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 10% 低減",
            "Level 16 - Accent of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 20% 低減",
            "Level 26 - Intonation of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 30% 低減",
            "Level 36 - Pulse of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 40% 低減",
            "Level 46 - Count of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 50% 低減。同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste"],
     text "新しく siege へのグループダメージボーナスが追加される。",
     ulist ["Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
