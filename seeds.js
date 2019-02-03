var mongoose = require("mongoose");
var Article = require("./models/article");
var User = require("./models/user");

var titles = [
    "Cut To The Chase",
    "Under Your Nose",
    "Money Doesn't Grow On Trees",
    "Scot-free",
    "There's No I in Team",
    "Cry Wolf",
    "Two Down, One to Go",
    "Keep Your Eyes Peeled",
    "Wouldn't Harm a Fly",
    "Yada Yada",
    "No Ifs, Ands, or Buts",
    "Read 'Em and Weep",
    "Dropping Like Flies",
    "Up In Arms",
    "Not the Sharpest Tool in the Shed",
    "Like Father Like Son",
    "Down For The Count",
    "It's Not Brain Surgery",
    "Cry Over Spilt Milk",
    "Break The Ice",
    "Jig Is Up",
    "Ring Any Bells",
    "Go For Broke",
    "A Dime a Dozen",
    "Jaws of Life"
];

var subtitles = [
    "He said he was not there yesterday; however, many people saw him there.",
    "She did not cheat on the test, for it was not the right thing to do.",
    "A glittering gem is not enough.",
    "I hear that Nancy is very pretty.",
    "Check back tomorrow; I will see if the book has arrived.",
    "We have a lot of rain in June.",
    "Sixty-Four comes asking for bread.",
    "They got there early, and they got really good seats.",
    "I often see the time 11:11 or 12:34 on clocks.",
    "Lets all be unique together until we realise we are all the same.",
    "She wrote him a long letter, but he didn't read it.",
    "She was too short to see over the fence.",
    "I am counting my calories, yet I really want dessert.",
    "The quick brown fox jumps over the lazy dog.",
    "If I don’t like something, I’ll stay away from it.",
    "The waves were crashing on the shore; it was a lovely sight.",
    "I want more detailed information.",
    "The shooter says goodbye to his love.",
    "He didn’t want to go to the dentist, yet he went anyway.",
    "Where do random thoughts come from?",
    "There was no ice cream in the freezer, nor did they have money to go to the store.",
    "I would have gotten the promotion, but my attendance wasn’t good enough.",
    "The sky is clear; the stars are twinkling.",
    "Christmas is coming.",
    "The body may perhaps compensates for the loss of a true metaphysics."
];

var images = [
    "https://images.unsplash.com/photo-1542838686-ddebb563fef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045162-47c36fadcf4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043032-8facc531c236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043230-75076f483df5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045108-1817700573a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549072545-a3352136e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549042875-e82f785239ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1542838686-ddebb563fef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045162-47c36fadcf4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043032-8facc531c236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043230-75076f483df5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045108-1817700573a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549072545-a3352136e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549042875-e82f785239ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1542838686-ddebb563fef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045162-47c36fadcf4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043032-8facc531c236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043230-75076f483df5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045108-1817700573a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549072545-a3352136e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549042875-e82f785239ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1542838686-ddebb563fef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045162-47c36fadcf4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043032-8facc531c236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549043230-75076f483df5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549045108-1817700573a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549072545-a3352136e702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549042875-e82f785239ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];

var bodyParagraph = "<p>Lorem ipsum dolor, sit amet consectetur <em>adipisicing</em> elit. Ut cum aspernatur est dolore vitae vero odio tenetur voluptatibus sequi odit cupiditate molestias, corrupti veritatis illo doloribus minus sed tempora autem explicabo accusamus totam eaque vel nam mollitia. Minus similique expedita delectus distinctio, aliquid illo tenetur unde rerum obcaecati amet alias dolorum quae enim adipisci sed. Numquam dolorem eum doloremque veniam eligendi consequuntur tempore error consectetur impedit voluptates nobis voluptatem qui minus illo voluptatum quis <strong>provident</strong>, quos animi dignissimos voluptatibus sed eos architecto nisi. Quae vel, consequuntur ducimus id cumque, aut voluptate tempora quibusdam rerum, rem reiciendis culpa! Dolorem tempore itaque distinctio. Voluptatum exercitationem suscipit consequuntur nostrum commodi. Nesciunt architecto voluptates a dolores blanditiis soluta nemo fugiat in, quam mollitia, consequatur labore ullam quia delectus incidunt impedit quo aliquid dicta consectetur ipsam dignissimos voluptatibus necessitatibus accusamus quas. Culpa aliquid itaque ea earum quod excepturi adipisci quia? Molestiae, illo quod maiores quisquam provident a aspernatur optio itaque odit vero, laborum iste in magni! Recusandae ipsam ut laborum velit accusantium illum quod eum, fugit neque ducimus. Veritatis fugit corporis amet rem odit dolore modi atque voluptas magni molestiae dignissimos molestias cumque dolores expedita dolor veniam error nesciunt velit commodi, quos pariatur omnis nemo! Est veritatis odio iste a enim cumque inventore possimus corrupti consectetur similique quis fuga ad fugiat debitis necessitatibus, sed exercitationem assumenda alias quaerat placeat, saepe dolor. Eligendi officia asperiores enim nostrum.<p>Quaerat dolorum expedita sapiente numquam aliquam ex nobis, repudiandae, debitis culpa dolor dolore atque earum illo sequi iste voluptatibus officiis voluptate odio repellat. Beatae maxime fugiat et aut porro odit similique delectus quam aspernatur quibusdam expedita in tempora assumenda dolore quae eligendi voluptatem impedit, repellat ipsam laudantium quo deserunt vero! Cum vel omnis quam consectetur aliquam dolorum ut laboriosam, possimus tempora, sequi tenetur? Dolores voluptate totam facilis placeat autem similique culpa iure nisi rerum est, eos voluptatibus. Dolorum, quo saepe aliquam eaque, delectus dolore, omnis eveniet harum nemo accusamus soluta non. Ab et a esse dolorum iusto enim dolore cum soluta ratione adipisci, reiciendis repellendus rem corrupti repellat sapiente odio, qui natus eum voluptate molestiae! Eaque necessitatibus soluta repellat autem veniam dicta explicabo voluptas ut laborum quasi, consequuntur, optio voluptatibus adipisci totam accusamus doloribus accusantium? Pariatur ipsum cumque numquam rerum cupiditate, laborum magni sapiente maiores consectetur obcaecati ullam nam deserunt est reiciendis doloremque cum facere molestias adipisci veniam velit eaque! Quaerat exercitationem non expedita, provident sequi enim cumque officiis eum facilis ea voluptates voluptas asperiores pariatur ab quibusdam, ad eos praesentium debitis. Maxime, tenetur modi ea autem possimus amet expedita vitae cum minima ab quas sapiente voluptatum facere. Pariatur, repellendus delectus magni nesciunt quaerat ipsum eum facere veniam incidunt, suscipit alias fuga aliquam maxime natus eos. Possimus hic saepe recusandae adipisci labore quidem! Temporibus tempora exercitationem alias distinctio aliquid maxime eveniet necessitatibus voluptates eaque ab voluptas amet explicabo neque, officia ratione commodi aspernatur nam velit! Laboriosam, nam ex unde facere minus, et reiciendis facilis quas dolorem cupiditate omnis. Quae eum sequi repudiandae, assumenda enim ipsa.</p>"

var createdAt = Date.now()

function seedDB() {
    console.log("Seeding started...");
    Article.remove({}, function(err){
        if (err) {
            console.log("Error occurred while deleting articles from the database");
        } else {
            console.log("Articles Removed!");
            for (var i = 0; i < 25; i++){
                var bodyParagraphs = "";
                for (var j = 0; j < 3; j++) {
                    bodyParagraphs += bodyParagraph;
                }
                var newArticle = {
                    title: titles[i],
                    subtitle: subtitles[i],
                    image: images[i],
                    body: bodyParagraphs,
                    createdAt: createdAt
                }
                Article.create(newArticle, function(err, articleCreated){
                    if (err) {
                        console.log("An error occurred while creating an article");
                    } else {
                        console.log("Article " + i + " added!");
                    }
                })
            }
        }
    })
}

module.exports = seedDB;