function chapter6() {
    sayHI = function () {
        console.log("hi");
    }
    let hifunction = setTimeout(sayHI, 1000);
    console.log('hello');
    clearTimeout(hifunction);

    let hiinterval = setInterval(sayHI, 1000);
    let clearinterval = setTimeout(() => { clearInterval(hiinterval) }, 5000);
    stick = () => {
        console.log('stick');
        timerID = setTimeout(stick, 1000);
    };
    let timerID = setTimeout(stick, 1000);
    clearTimeout(timerID);

    waitprint = (cb = () => { console.log('callback'); }) => {
        setTimeout(
            function () {
                console.log('timeout');
                cb();
            }
            , 1000
        )
    };
    waitprint();


    sayHI = function () {
        console.log("hi");
    }

    let testPromise = new Promise(function (resolve, sayHI) {
        let flag = 0;
        if (flag == 0)
            resolve("this is resolve111111");
        else {
            sayHI();
        }
    });

    testPromise.then(
        (out) => {
            setTimeout(() => { console.log(out); }, 1000);
        },
        (i) => { console.log(i); }
    );

    waitprint = (someInput) => {
        return new Promise((suc, err) => {
            setTimeout(
                function () {
                    console.log(someInput);
                    suc();
                }, 1000
            );

        })
    }

    waitprint('hello')
        .then(
            () => waitprint('then1 world!')
        )
        .then(
            () => waitprint('then2 good!')
        )
        .catch((err) => { console.log(err); })
        .finally(
        // the finally method is always excuted. 
    )
}