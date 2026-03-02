const fs = require('fs');
const files = [
    'src/components/home/FeaturedCourses.tsx',
    'src/components/home/IndexMatcher.tsx',
    'src/data/courses.ts'
];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/prestige: (\d+),/g, 'prestige: $1, slope: 130, length: 6500, established: 1900,');
    fs.writeFileSync(file, content);
});
