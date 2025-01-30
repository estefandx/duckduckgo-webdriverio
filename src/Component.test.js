import {expect } from '@wdio/globals'
import axios from 'axios';

const processIcons = (topic) => {
    if (topic.Icon && topic.Icon.URL && topic.Icon.URL !== '') {
        console.log("Icon:", topic.Icon);
    }
  };

describe('API Search DuckDuckGo', function() {
    it('should return a successful response from DuckDuckGo API', async function() {
     
      const response = await axios.get('https://api.duckduckgo.com', {
        params: {
          q: 'android', 
          format: 'json' 
        }
      });
  
     
      expect(response.status).toBe(200);
    
      const relatedTopics = response.data.RelatedTopics;
      expect(Array.isArray(relatedTopics)).toBe(true);

      for (const topic of relatedTopics) {
        processIcons(topic);
        if (topic.Topics && Array.isArray(topic.Topics)) {
          for (const subTopic of topic.Topics) {
            processIcons(subTopic);
          }
        }
      }
    });
  });