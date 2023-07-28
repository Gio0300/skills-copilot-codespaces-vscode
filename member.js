function skillsMember() {
    this.skills = ['JavaScript', 'React', 'Angular'];
    this.addSkill = function (skill) {
        this.skills.push(skill);
    }
}