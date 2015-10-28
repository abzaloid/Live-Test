#coding=utf-8

lang = 'kazakh'

files = ['biology', 
'chemistry', 
'english', 
'geography', 
'history',
'kazakh',
'literature',
'math',
'physics',
'russian',
'world_history']

kz = {
'biology' : u'Биология',
'chemistry': u'Химия',
'english': u'Ағылшын тілі',
'geography': u'География', 
'history': u'Қазақстан Тарихы',
'kazakh': u'Қазақ тілі',
'literature': u'Әдебиет',
'math': u'Математика',
'physics': u'Физика',
'russian': u'Русский язык',
'world_history': u'Дүние жүзі тарихы',
}

ru = {
'biology' : u'Биология',
'chemistry': u'Химия',
'english': u'Английский',
'geography': u'География', 
'history': u'История Казахстана',
'kazakh': u'Қазақ тілі',
'literature': u'Литература',
'math': u'Математика',
'physics': u'Физика',
'russian': u'Русский язык',
'world_history': u'Всемирная история',
}

is_fifth = {
'biology' : 'true',
'chemistry': 'true',
'english': 'true',
'geography': 'true', 
'history': 'false',
'kazakh': 'false',
'literature': 'true',
'math': 'false',
'physics': 'true',
'russian': 'false',
'world_history': 'true',
}

js = []

for m_file in files:
	f = open('%s.txt' % m_file, 'r')

	answers = []
	choices = []
	questions = []

	cnt = 0

	for i in range(25):
		choices.append([])

	for s in f:
		s = s.decode('utf8')

		# print s.encode('utf8')

		line_len = len(s)
		if line_len < 2:
			continue
		start_ind = 0
		while start_ind < line_len and s[start_ind] == u' ':
			start_ind += 1
		
		if u"Вы ответили " in s:
			if u"Правильный" in s:
				answers.append(s[-5:])
			else:
				answers.append(u"A\n")

			continue

		if start_ind == line_len:
			continue

		if s[start_ind] in u"0123456789":
			questions.append(s[start_ind:])
		elif s[start_ind] in u"АВСДЕABCDE" and s[start_ind + 1] in u")":
			choices[cnt // 5].append(s[start_ind:])
			cnt += 1

	f.close()

	f = open('%s.questions' % m_file, 'w')
	for q in questions:
		f.write(q.encode('utf8'))
	f.close()
	f = open('%s.answers' % m_file, 'w')
	for q in answers:
		f.write(q.encode('utf8'))
	f.close()
	f = open('%s.choices' % m_file, 'w')
	ch = 0
	for q in choices:
		for l in q:
			f.write(l.encode('utf8'))
			ch += 1
	f.close()

	f = open('%s.correct' % m_file, 'w')
	f.write("choices = " + str(ch == 125) + "\n")
	f.write("questions = " + str(len(questions) == 25)+ "\n")
	f.write("answers = " + str(len(answers) == 25)+ "\n")

	for i in range(25):
		chs = []
		for p in choices[i]:
			chs.append(p.replace('\n', '<br/>'))
		js.append(u"""Questions.insert({
						question: "%s",
						answer: "%s",
						choice_A: "%s",
						choice_B: "%s",
						choice_C: "%s",
						choice_D: "%s",
						choice_E: "%s",
						number: %s,
						course_en: '%s',
						course_kz: '%s',
						course_ru: '%s',
						is_fifth: %s,
						language: '%s',
					}
					);
				""" % (questions[i].replace('\n', '<br/>').replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					answers[i].replace('\n', '<br/>').replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					chs[0].replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					chs[1].replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					chs[2].replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					chs[3].replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					chs[4].replace(u'"', u'&quot;').replace(u"'", u'&quot;').replace(u'\\', u'\\\\'), 
					str(i + 1), 
					m_file, 
					kz[m_file], 
					ru[m_file], 
					is_fifth[m_file], 
					lang))

f = open('database.txt', 'w')
for l in js:
	f.write(l.encode('utf8'))
f.close()