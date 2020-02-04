import {
  createModule,
} from 'vuex-class-component';

const VuexModule = createModule({
  namespaced: 'activitiesStore',
  strict: false,
});

export default class ActivitiesStore extends VuexModule {
  activities = [
    {
      icon: {
        imagePath: 'images/toolbarButton-download1.svg',
        backgroundColor: '#E3EFFF',
      },
      content: {
        text: 'Darika Samak uploaded 4 files on An option to search in '
          + 'current projects or in all projects',
        attachments: {
          imagesAttached: [
            {
              imagePath: 'images/attached-pic1.jpg',
              imageName: 'hall with columns',
            },
            {
              imagePath: 'images/attached-pic2.jpg',
              imageName: 'lights of the night city',
            },
            {
              imagePath: 'images/attached-pic3.jpg',
              imageName: 'lake in the mountains',
            },
            {
              imagePath: 'images/attached-pic4.jpg',
              imageName: 'frozen air bubble',
            },
          ],
          textsAttached: [],
        },
      },
      time: '6:02 PM',
    },
    {
      icon: {
        imagePath: 'images/square-speech-bubble-svgrepo-com.svg',
        backgroundColor: '#FFF8DD',
      },
      content: {
        text: 'Emilee Simchenko commented on Account for teams and '
          + 'personal in bottom style',
        attachments: {
          imagesAttached: [],
          textsAttached: [
            {
              textAttached: 'During a project build, it is necessary to evaluate '
                + 'the product design and development against project '
                + 'requirements and outcomes',
            },
          ],

        },
      },
      time: '7:32 PM',
    },
    {
      icon: {
        imagePath: 'images/Icon@3x.svg',
        backgroundColor: '#CEF9C6',
      },
      content: {
        text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        attachments: {
          imagesAttached: [],
          textsAttached: [],
        },
      },
      time: '8:40 PM',
    },
  ];
}
