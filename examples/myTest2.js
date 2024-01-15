import editly from '../index.js';
import { getPanEffectBy } from '../zoompan/zoompan.js';

// TODO test data
const aspectRatio = '9:16';
const videos = [
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/1522ef0c828d6767f1f1ff18472e6888.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:02,998\n时泽宇同样在关注着今天的比赛\n\n2\n00:00:02,998 --> 00:00:05,997\n先后输给龙空空和子桑琉荧之后\n\n3\n00:00:05,997 --> 00:00:10,120\n他整个人的气质似乎都发生了一些变化\n\n4\n00:00:10,120 --> 00:00:11,244\n相比于之前\n\n5\n00:00:11,244 --> 00:00:12,744\n显得内敛了许多\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-10/8e7696fead53464db0d62b641ee1fea1_00001_.png',
  //   ],
  //   effectName: 'zoom-out',
  //   wavDuration: 3,
  // },
  {
    wavUrl: 'https://cdn-res.storypower.ai/speech/55a8b4bc8a3af34e2ef90e1258a2753c.wav',
    srtTexts: '1\n00:00:00,000 --> 00:00:03,024\n屿桐柔声道，这是你的比赛\n\n',
    mediaUrls: [
      'https://cdn-res.storypower.ai/output/2024-01-08/f927cfd128ef4e69a9f9f1e6bf890072_00001_.png',
    ],
    effectName: 'pan-right',
    wavDuration: 3,
  },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/918ad17d91ea8dbabcbd5dcd8a60c276.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:02,712\n我来那就不是真正的你了\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-08/36234856fe55404a8268738676ce8314_00001_.png',
  //   ],
  //   effectName: 'pan-left',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/9e58a4b85d72cb930030d374b50e985b.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:02,088\n屿桐淡淡地开口\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/a6388b28d5334145aed67f81aeb619ca_00001_.png',
  //   ],
  //   effectName: 'pan-right',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/4fecc94293a40f7a24a91449563d9b04.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:01,992\n他说他不想说话\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/1b86e927111b447e81728f15c6a40a85_00001_.png',
  //   ],
  //   effectName: 'zoom-out',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/7584d0d527dc453656b4322e2119afbe.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:02,232\n龙空空急忙开口\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/e52f51a6fa5e4ba39d5b2ff528b80077_00001_.png',
  //   ],
  //   effectName: 'zoom-out',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/c8ef941a5bed28ede8a3092c5c3a7bc7.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:03,522\n却不是道歉，只说：“别啊，别啊\n\n2\n00:00:03,522 --> 00:00:03,816\n”\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/39398684fb934a3a99cd105d447ea525_00001_.png',
  //   ],
  //   effectName: 'zoom-out',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/e3795b2526bac63ca45a782c3bf9f065.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:04,656\n“我错了还不行吗？我实在是犯不着没有你啊”\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/499f8dce458a481dad56c7c1b4006145_00001_.png',
  //   ],
  //   effectName: 'zoom-out',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/fcb784866a00f821fb634e3c1dbd20b5.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:03,744\n你这么一说，顿时让我感觉稳如泰山\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/3879b72db4b848cf9a280712bdef2b5a_00001_.png',
  //   ],
  //   effectName: 'pan-right',
  //   wavDuration: 3,
  // },
  // {
  //   wavUrl: 'https://cdn-res.storypower.ai/speech/bfa863635b997d330a69f53aabe1c1e2.wav',
  //   srtTexts: '1\n00:00:00,000 --> 00:00:03,816\n心想，我岂不是能胜过子桑琉荧了\n\n',
  //   mediaUrls: [
  //     'https://cdn-res.storypower.ai/output/2024-01-11/99a4eb3e7e664b82a56ccbf4ce0cdcc0_00001_.png',
  //   ],
  //   effectName: 'zoom-in',
  //   wavDuration: 3,
  // },
];
// END

editly({
  width: aspectRatio === '16:9' ? 1280 : 720,
  height: aspectRatio === '16:9' ? 720 : 1280,
  fps: 30,
  outPath: './output/myTest2.mp4',
  clips: videos.map((video) => ({
    duration: video.wavDuration,
    layers: [
      { type: 'audio', path: video.wavUrl },
      video.effectName.startsWith('zoom-')
        ? { type: 'image', path: video.mediaUrls[0], resizeMode: 'cover', zoomDirection: video.effectName.replace('zoom-', ''), zoomAmount: 0.5 }
        : { type: 'canvas', func: getPanEffectBy(video) },
    ],
  })),
  loopAudio: true,
  keepSourceAudio: true,
  allowRemoteRequests: true,
  // audioTracks: [
  //   { path: './assets/High [NCS Release] - JPB  (No Copyright Music)-R8ZRCXy5vhA.m4a', mixVolume: 0.2 },
  // ],
}).catch(console.error);
