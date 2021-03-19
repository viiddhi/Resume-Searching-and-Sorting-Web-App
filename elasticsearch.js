const express = require('express')
var bodyParser = require('body-parser')
var app = express()
var nodemailer = require('nodemailer');
var elasticsearch = require('elasticsearch');
var smtpTransport = require('nodemailer-smtp-transport');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
new_line: "\n\xA0"
app.set('port', 4000);

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
app.get('/', function(req, res) {
    res.sendFile('scroll_spy.html', {root : __dirname + '/'});
});
app.get('/redirecttohome', function(req, res) {
    res.sendFile('redirecttohome.html', {root : __dirname + '/'});
});
app.get('/form', function(req, res) {
    res.sendFile('form.html', {root : __dirname + '/'});
});
app.get('/iframe', function(req, res) {
    res.sendFile('iframe.html', {root : __dirname + '/'});
});
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'hrprojectjio@gmail.com',
    pass: 'HRproject2018'
  }
}));
app.post('/route', function(req, res) {
  var l = 0
  if(req.body.emailtosend[1][1] == undefined) {
    var mailOptions = {
      from: 'hrprojectjio@gmail.com',
      to: req.body.emailtosend,
      subject: 'Invitation for interview at Completely Hypothetical Company(HSC)',
      text: 'Congratulations!.\nYour resume was selected and you are expected to arrive for interview at exprected time.\nFor queries, disturb freely.\nMr. Bored H,Senior HR.'
    };
    smtpTransport.sendMail(mailOptions, function(error, info) {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: ' + info.response);
    });
  }
  else {
    for (l = 0; l < req.body.emailtosend.length; ++l){
      var mailOptions = {
        from: 'hrprojectjio@gmail.com',
        to: req.body.emailtosend[l],
        subject: 'Invitation for interview at Completely Hypothetical Company(HSC)',
        text: 'Congratulations!.\nYour resume was selected and you are expected to arrive for interview at exprected time.\nFor queries, disturb freely.\nMr. Bored H,Senior HR.'
      };
      smtpTransport.sendMail(mailOptions, function(error, info) {
             if (error) {
                 return console.log(error);
             }
             console.log('Message sent: ' + info.response);
         }
      );

    }

  }
  
  
});


  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });
  function specialSkills(ss) {
      var answer = ``
      if (ss == undefined) return answer;

      if (ss[1][1] == undefined) {
          answer +=`{ "match": {
                    "Special Skills": {
                      "query": "`+ss+`",
                      "boost":3 
                    }
                }},`
                return answer;

      }
      var length =  ss.length

      var i
      
      for (i = 0; i<length - 1; ++i) {
          answer += `{ "match": {
                    "Special Skills": {
                      "query": "`+ss[i]+`",
                      "boost":3 
                    }
                }},`
      }
      answer +=`{ "match": {
                    "Special Skills": {
                      "query": "`+ss[length - 1]+`",
                      "boost":3 
                    }
                }},`
      
      
      return answer
  }

  function languages(ss) {
      var answer = ``
      if (ss == undefined) return answer;

      if (ss[1][1] == undefined) {
          answer +=`{ "match": {
                    "Languages": {
                      "query": "`+ss+`",
                      "boost":1.2
                    }
                }},`
                return answer;

      }
      var length =  ss.length

      var i
      
      for (i = 0; i<length - 1; ++i) {
          answer += `{ "match": {
                    "Languages": {
                      "query": "`+ss[i]+`",
                      "boost":1.2 
                    }
                }},`
      }
      answer +=`{ "match": {
                    "Languages": {
                      "query": "`+ss[length - 1]+`",
                      "boost":1.2 
                    }
                }},`
      
      return answer
  }

  function programming(ss) {
      var answer = ``
      if (ss == undefined) return answer;

      if (ss[1][1] == undefined) {
          answer +=`{ "match": {
                    "Programming Languages": {
                      "query": "`+ss+`",
                      "boost":3 
                    }
                }},`
                return answer;

      }
      var length =  ss.length

      var i
      
      for (i = 0; i<length - 1; ++i) {
          answer += `{ "match": {
                    "Programming Languages": {
                      "query": "`+ss[i]+`",
                      "boost":3 
                    }
                }},`
      }
      answer +=`{ "match": {
                    "Programming Languages": {
                      "query": "`+ss[length - 1]+`",
                      "boost":3 
                    }
                }},`
      
      
      return answer
  }

  function data_bases(ss) {
      var answer = ``
      if (ss == undefined) return answer;

      if (ss[1][1] == undefined) {
          answer +=`{ "match": {
                    "Database": {
                      "query": "`+ss+`",
                      "boost":3 
                    }
                }},`
                return answer;

      }
      var length =  ss.length

      var i
      
      for (i = 0; i<length - 1; ++i) {
          answer += `{ "match": {
                    "Database": {
                      "query": "`+ss[i]+`",
                      "boost":3 
                    }
                }},`
      }
      answer +=`{ "match": {
                    "Database": {
                      "query": "`+ss[length - 1]+`",
                      "boost":3 
                    }
                }},`
      
      
      return answer
  }
  function search(req, res, indexName, query){
          var answer_email
          var name 
          var answer = `<!DOCTYPE html>
  <html>
  <head>
  	<title>Know your Employee</title>
  	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>

    <style>
    </style>
  </head>
  <body>
    <form id="formId" method="POST" action="/route" name="myForm">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 align="center">Your Future Employees</h2>
              <div class="jumbotron">
                <div class="table-responsive">
                  <table id="mytable" class="table table-bordred table-striped">
                    <thead><tr align="center"><th><input type="checkbox" id="checkall" /></th><th>Name</th><th>Contact</th><th>E-mail</th></tr></thead>
                      <tbody> `;
                        client.search({
                            index: indexName,
                            body: query,
                            searchType : 'dfs_query_then_fetch',
                            size: 51
                        }).then(function (resp0) {

                            for (i = 0; i < resp0["hits"]["hits"].length; ++i ) {
                                answer +=`<tr><td><input type="checkbox" name = 'emailtosend' value ='`+resp0["hits"]["hits"][i]["_source"]["E-mail"]+`' class="checkthis" /></td>`
                                answer +=`<td>`+resp0["hits"]["hits"][i]["_source"]["Full Name"]+`</td>`;
                                answer +=`<td>`+resp0["hits"]["hits"][i]["_source"]["Contact Number"]+`</td>`;
                                answer +=`<td id = email`+i+`>`+resp0["hits"]["hits"][i]["_source"]["E-mail"]+`</td>`;
                                answer_email +=`<td>`+resp0["hits"]["hits"][i]["_source"]["E-mail"]+`</td>`;                             
                            }
                            answer+=
                    `<tr>
                  </table>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="text-center"><input type="submit" class="btn btn-info" value="Send Mail"></div>
    </form>

    <script>
      $(document).ready(function(){
        $("#mytable #checkall").click(function () {
            if ($("#mytable #checkall").is(':checked')) {
                $("#mytable input[type=checkbox]").each(function () {
                    $(this).prop("checked", true);
                });
            } else {
                $("#mytable input[type=checkbox]").each(function () {
                    $(this).prop("checked", false);
                });
                }
        });
        $("[data-toggle=tooltip]").tooltip();
      });
    </script>
    <script>
      function Redirect() {
        window.location="/redirecttohome";
      }
      document.getElementById("formId").onsubmit = function() {myFunction()};
      function myFunction() {
        alert("E-mail sent to the selected Employee/s");
        setTimeout('Redirect()',0);
      }
      

            
            
     
    </script>
  </body>
  </html>`
    res.send(answer);
              
              
            
    }, function (err) {
        console.log(err.message);
        return res.json(err.message)
    });
  }
  app.use(bodyParser.urlencoded({ extended: true })); 


  app.post('/actions', function(req, res) {
        ss = []
        lang = []
        databases = []
        prog = []
        ss = req.body.spec_skills
        lang = req.body.langu
        databases = req.body.databases
        prog = req.body.prog
        gender  = req.body.gender


        answer = specialSkills(ss)
        answer+= languages(lang)
        answer += data_bases(databases)
        answer += programming(prog)


        if (gender == 'Male' || gender == 'Female' || gender == 'Others') {
            gender_query = `{ "match": { "Gender": "`+gender+`" }},`
        }
        else {
            gender_query = ``
        }


        header = `{
   "query": { 
     "bool": {
        `;
        filter = `"filter": [
          {
            "range" : {
              "10th Percentage": {
                  "gte": `+req.body.tenth+`

              }
            }
          },
          {
            "range" : {
              "12th/Diploma Percentage":{ 
                  "gte": `+req.body.twelfth+`
              }
            }
          },
           `+gender_query+`
          {
            "range" : {
              "BE(CGPA)": {
                  "gte": `+req.body.becgpa+` 
              }
            }
          }
        ],
        `;
        strictness_less = `"should": [
          `;
         strictness_more = `"must": [
          `;
        pre_end_more = `"should": [`
        end = `
        {
            "range": {
              "BE(CGPA)": {
                "gte": 7,
                "lte": 8,
                "boost": 1.2
              }
            }
          },
          {
            "range": {
              "BE(CGPA)": {
                "gte": 8,
                "lte": 9,
                "boost":1.5
              }
            }
          },
          {
            "range": {
              "BE(CGPA)": {
                "gte": 9,
                "lte": 10,
                "boost":2
              }
            }
          },
          {
            "range": {
              "Cumulative Internship Experience ( in months)": {
                "gte": 0.9,
                "lte": 3,
                "boost":3
              }
            }
          },
          {
            "range": {
              "Cumulative Internship Experience ( in months)": {
                "gte": 3,
                "lte": 6,
                "boost":1.5
              }
            }
          },
          {
            "range": {
              "Cumulative Internship Experience ( in months)": {
                "gte": 6,
                "lte": 12,
                "boost":1.8
              }
            }
          },
          {
            "range": {
              "Cumulative Internship Experience ( in months)": {
                "gte": 12,
                "boost":2
              }
            }
          },
          {
            "range": {
              "Job Experience ( in months)": {
                "gte": 6,
                "lte": 12,
                "boost":1.2
              }
            }
          },
          {
            "range": {
              "Job Experience ( in months)": {
                "gte": 12,
                "lte": 24,
                "boost":1.4
              }
            }
          },
          {
            "range": {
              "Job Experience ( in months)": {
                "gte": 24,
                "boost":1.5
              }
            }
          }
        ]
      }
    }
   }`;
         if (req.body.strict == "Less") {
             query_string = `{
            "query_string": {
              "default_field": "Languages",
              "query": "English OR Hindi"
            }
          },
         `;
             query = header+filter+strictness_less+answer+query_string+end; 
         }
         else {
             query_string = `{
            "query_string": {
              "default_field": "Languages",
              "query": "English OR Hindi"
            }
          }
          ],
         `;
         end = pre_end_more + end
             query = header+filter+strictness_more+answer+query_string+end;
         }
        var index = "resume";
        search(req, res, index, query);
  });
app.listen(3000, () => console.log('Example app listening on port 3000!'))






