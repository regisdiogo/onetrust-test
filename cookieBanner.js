const jwt = require('jsonwebtoken');
const {
  v4: uuidv4
} = require('uuid');
const PUBLIC_KEY = 'Q29va2llIEJhbm5lciB1c2luZyBPbmVUcnVzdA==';

const renderCrossConsentCookieBanner = function (uuid) {
  return `<script src="https://cdn.cookielaw.org/consent/${uuid}/otSDKStub.js" 
    type="text/javascript" charset="UTF-8" data-domain-script="${uuid}"
    data-document-language="true"></script>
  <script type="text/javascript">
  function OptanonWrapper() { }
  </script>`;
};

const getUserCrossConsentObject = function (userId) {
  const token = jwt.sign({
    sub: userId
  }, PUBLIC_KEY, {
    noTimestamp: true
  });
  console.log(userId);
  return `<script type="text/javascript">
      var OneTrust = {
        dataSubjectParams: {
          id: '${userId}',
          isAnonymous: false,
          token : '${token}'
        }
      };
  </script>`;
}

exports.cookieBanner = function (uuid, userId) {
  return `${getUserCrossConsentObject(userId)}
  ${renderCrossConsentCookieBanner(uuid)}`;
}

exports.getUser = function () {
  return {
    id: uuidv4(),
  };
}