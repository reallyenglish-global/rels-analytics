const pageForLesson = (lesson) => {
  return Object.entries(lesson.position).reduce((path, [key, value]) => {
    return `${path}/${key}/${value}`
  }, `/lesson/${lesson.id}`)
}
export { pageForLesson }
