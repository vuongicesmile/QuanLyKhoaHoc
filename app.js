

const courceAPI = "http://localhost:3000/login"


function start() {
    // lay ra khoa hoc, nhan lai du lieu course sau khi fetch ben duoi la array
    getCourses(renderCourse);

    handleCreateForm();

}

start();


//function
//hàm lấy ra khoá học 
function getCourses(callback){
    fetch(courceAPI)
    .then(function(response) {
        return response.json();
    })
    .then(callback)
}

function CreateCourse(data,callback){

    var options = {
        method : 'post',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch(courceAPI, options)
        .then(function(response) {
            // Sau khi Tạo xong 1 tài nguyên nó sẽ trả về cho 
            // bạn chính cái tài nguyên được tạo mới 
            response.json();
        })
        .then(callback);
}
function deleteCourse(id) {
    var options = {
        method : 'DELETE',
        headers : {
            'Content-Type': 'application/json'
        },
    }
    fetch(courceAPI + '/' + id, options)
        .then(function(response) {
            // Sau khi Tạo xong 1 tài nguyên nó sẽ trả về cho 
            // bạn chính cái tài nguyên được tạo mới 
            response.json();
        })
        .then(function(){
            getCourses(renderCourse)
        });
}

function renderCourse(courses){
    var listCourseBlock = document.querySelector('#list-cources')
    var htmls = courses.map(function(course){
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onClick="deleteCourse(${course.id})"> Xoa </button>
            </li>
        `;
    });
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        console.log(name);
        var des = document.querySelector('input[name="description"]').value;
        console.log(des);
        // truyen dữ liệu vào ( là cái data)
        var formData = {
            name :name,
            description :des
        }
        CreateCourse(formData, function() {
            // goi lai thang getCourses de load lai 
            getCourses(renderCourse)
        })
    }
}