import sys
import Quartz

def get_pdf_text(path):
    pdf = Quartz.CGPDFDocumentCreateWithURL(Quartz.NSURL.fileURLWithPath_(path))
    if not pdf:
        return ""
    text = ""
    for i in range(1, Quartz.CGPDFDocumentGetNumberOfPages(pdf) + 1):
        page = Quartz.CGPDFDocumentGetPage(pdf, i)
        # It's tricky to extract text just with Quartz. 
