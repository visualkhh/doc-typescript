export class File {
    constructor(public name: string = 'say') {
    }

    say() {
        console.log(this.name)
    }

}
