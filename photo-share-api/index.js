// 1. apollo-server 를 불러옵니다.
const { ApolloServer } = require("apollo-server");

const typeDefs = `
  # 1. Photo 타입 정의를 추가합니다.
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String! description: String, url: String!): Photo!
  }
`;

// 고유 ID를 만들기 위해 값을 하나씩 증가시킬 변수
var _id = 0;

// 메모리에 사진을 저장할 때 사용할 데이터 타입
var photos = [];

const resolvers = {
  Query: {
    // 사진 배열의 길이를 반환
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(parent, args) {
      var newPhoto = {
        id: ++_id,
        ...args,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
};

// 2. 서버 인스턴스를 새로 만듭니다.
// 3. typeDefs(스키마)와 리졸버를 객체에 넣어 전달합니다.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. 웹 서버를 구동하기 위해 listen 메서드를 호출합니다.
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
