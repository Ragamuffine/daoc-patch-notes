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
     text "resist chant は30分継続のバフになる。高レベルの resist は16%から12%に下げられる。低レベルのものは8%のまま。",
     br [] [],
     text "新しい speed buff を追加",
     ulist ["Crescendo, realm target, instant-cast, 再使用45秒, 7秒間継続, 130% speed buff, レベル35. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "Great Crescendo, realm target, instant-cast, 再使用45秒, 9秒間継続, 160% speed buff, レベル44. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "March of Bragi, realm target, instant-cast, 再使用10分, 9秒間継続, 160% speed buff, レベル50. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。"],
     text "group fatigue reduction buff は pulse に戻る。",
     text "Moved Epiphany はレベル49になる。",
     br [] [],
     text "新しい PBAoE confuse spell が追加される。",
     ulist ["Level 27 - Disorienting Yelp - 20秒間継続 - 90s 再使用 - 500 半径 - 10% power cost",
            "Level 47 - Disorienting Cry - 20秒間継続 - 90s 再使用 - 750 半径 - 10% power cost"],
     text "新しいスペル Sleep and Stun Guard が追加される。",
     ulist ["Level 38 - Sleep Guard - Instant cast - realm-targeted - mezz を一度だけブロックする - 1000 range - 5 minute 再使用",
            "Level 48 - Stun Guard - Instant cast - realm-targeted - スタン(呪文)を一度だけブロックする - 1000 range - 5 minute 再使用"],
     text "single-target DD は power pool の30%を回復するようになる。",
     br [] [],
     text "group-pulse ablative chant は single target 100% melee ablative バフになる。8s cast, 再使用60秒, 30秒間継続。自分には使用できない。",
     ulist ["Level 30 - Barrier of Sound - Absorbs 150 melee damage",
            "Level 40 - Shield of Melody - Absorbs 225 melee damage",
            "Level 50 - Wall of Song - Absorbs 300 melee damage"],
     text "speed song がランダムに落ちることがなくなる。",
     secmid "Axe (スペック)",
     ulist ["Level 29 - Havoc - Anytime - スタイルダメージやや減少",
            "Level 44 - Arctic Rfit - Evernight - スタイルダメージ増加"],
     secmid "Sword (スペック)",
     ulist ["Level 34 - Polar Rift - Anytime - スタイルダメージやや減少",
            "Level 50 - Ragnarok - Rear - still has rear snare, スタイルダメージ増加"],
     secmid "Hammer (スペック)",
     ulist ["Level 32 - Comminute - Anytime - スタイルダメージやや減少",
            "Level 44 - Sledgehammer - Conquer - スタイルダメージ増加"]]
